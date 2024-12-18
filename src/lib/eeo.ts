```typescript
import { atom } from 'jotai';
import { EEOReport, BiasAnalysis, DemographicCategory } from '../types/eeo';
import { PerformanceReview } from '../types/performance';

export const eeoReportsAtom = atom<EEOReport[]>([]);

export const generateEEOReport = (
  organizationId: string,
  startDate: string,
  endDate: string,
  employees: Array<{
    id: string;
    demographics?: Record<DemographicCategory, string>;
  }>,
  performanceReviews: PerformanceReview[],
  promotions: Array<{
    employeeId: string;
    date: string;
    previousRole: string;
    newRole: string;
  }>,
  salaries: Array<{
    employeeId: string;
    amount: number;
    effectiveDate: string;
  }>
): EEOReport => {
  // Calculate demographic distributions
  const demographics = calculateDemographicDistribution(employees);

  // Calculate trends
  const trends = calculateDemographicTrends(
    organizationId,
    startDate,
    endDate,
    demographics
  );

  // Analyze potential bias
  const biasIndicators = analyzeForBias(
    employees,
    performanceReviews,
    promotions,
    salaries
  );

  const report: EEOReport = {
    id: Math.random().toString(36).substr(2, 9),
    organizationId,
    reportingPeriod: { startDate, endDate },
    demographics,
    trends,
    biasIndicators,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accessRoles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'],
  };

  eeoReportsAtom.init = [...eeoReportsAtom.init, report];
  return report;
};

const calculateDemographicDistribution = (
  employees: Array<{
    id: string;
    demographics?: Record<DemographicCategory, string>;
  }>
) => {
  const categories = Object.values(DemographicCategory);
  const totalEmployees = employees.length;

  return categories.map(category => {
    const distribution = employees.reduce((acc, employee) => {
      const value = employee.demographics?.[category] || 'UNDISCLOSED';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      category,
      distribution: Object.entries(distribution).map(([value, count]) => ({
        value,
        count,
        percentage: (count / totalEmployees) * 100,
      })),
    };
  });
};

const calculateDemographicTrends = (
  organizationId: string,
  startDate: string,
  endDate: string,
  currentDemographics: EEOReport['demographics']
): EEOReport['trends'] => {
  // Get previous report for comparison
  const previousReport = eeoReportsAtom.init
    .filter(report => 
      report.organizationId === organizationId &&
      report.reportingPeriod.endDate < startDate
    )
    .sort((a, b) => 
      new Date(b.reportingPeriod.endDate).getTime() - 
      new Date(a.reportingPeriod.endDate).getTime()
    )[0];

  if (!previousReport) return [];

  return currentDemographics.map(({ category, distribution }) => ({
    category,
    changes: distribution.map(current => {
      const previous = previousReport.demographics
        .find(d => d.category === category)
        ?.distribution.find(d => d.value === current.value);

      const previousValue = previous?.percentage || 0;
      const percentageChange = ((current.percentage - previousValue) / previousValue) * 100;

      return {
        value: current.value,
        previousPeriod: previousValue,
        currentPeriod: current.percentage,
        percentageChange,
      };
    }),
  }));
};

const analyzeForBias = (
  employees: Array<{
    id: string;
    demographics?: Record<DemographicCategory, string>;
  }>,
  performanceReviews: PerformanceReview[],
  promotions: Array<{
    employeeId: string;
    date: string;
    previousRole: string;
    newRole: string;
  }>,
  salaries: Array<{
    employeeId: string;
    amount: number;
    effectiveDate: string;
  }>
): EEOReport['biasIndicators'] => {
  const biasIndicators: EEOReport['biasIndicators'] = [];

  // Analyze performance reviews
  const performanceBias = analyzePerformanceReviews(employees, performanceReviews);
  if (performanceBias) {
    biasIndicators.push(performanceBias);
  }

  // Analyze promotions
  const promotionBias = analyzePromotions(employees, promotions);
  if (promotionBias) {
    biasIndicators.push(promotionBias);
  }

  // Analyze compensation
  const compensationBias = analyzeCompensation(employees, salaries);
  if (compensationBias) {
    biasIndicators.push(compensationBias);
  }

  return biasIndicators;
};

const analyzePerformanceReviews = (
  employees: Array<{
    id: string;
    demographics?: Record<DemographicCategory, string>;
  }>,
  reviews: PerformanceReview[]
): EEOReport['biasIndicators'][0] | null => {
  // Group reviews by demographic categories and calculate average ratings
  const categories = Object.values(DemographicCategory);
  
  for (const category of categories) {
    const groupedReviews = groupReviewsByDemographic(employees, reviews, category);
    const disparity = checkRatingDisparity(groupedReviews);
    
    if (disparity.hasSignificantDisparity) {
      return {
        category: 'Performance Reviews',
        description: `Significant disparity detected in performance ratings across ${category.toLowerCase()} groups`,
        severity: disparity.severity,
        recommendations: [
          'Review performance evaluation criteria for potential bias',
          'Provide unconscious bias training for managers',
          'Implement structured evaluation frameworks',
          'Regular audits of performance review processes',
        ],
      };
    }
  }

  return null;
};

const analyzePromotions = (
  employees: Array<{
    id: string;
    demographics?: Record<DemographicCategory, string>;
  }>,
  promotions: Array<{
    employeeId: string;
    date: string;
    previousRole: string;
    newRole: string;
  }>
): EEOReport['biasIndicators'][0] | null => {
  const categories = Object.values(DemographicCategory);
  
  for (const category of categories) {
    const groupedPromotions = groupPromotionsByDemographic(employees, promotions, category);
    const disparity = checkPromotionDisparity(groupedPromotions);
    
    if (disparity.hasSignificantDisparity) {
      return {
        category: 'Promotions',
        description: `Significant disparity detected in promotion rates across ${category.toLowerCase()} groups`,
        severity: disparity.severity,
        recommendations: [
          'Review promotion criteria and processes',
          'Implement transparent career progression frameworks',
          'Ensure equal access to development opportunities',
          'Regular analysis of promotion patterns',
        ],
      };
    }
  }

  return null;
};

const analyzeCompensation = (
  employees: Array<{
    id: string;
    demographics?: Record<DemographicCategory, string>;
  }>,
  salaries: Array<{
    employeeId: string;
    amount: number;
    effectiveDate: string;
  }>
): EEOReport['biasIndicators'][0] | null => {
  const categories = Object.values(DemographicCategory);
  
  for (const category of categories) {
    const groupedSalaries = groupSalariesByDemographic(employees, salaries, category);
    const disparity = checkCompensationDisparity(groupedSalaries);
    
    if (disparity.hasSignificantDisparity) {
      return {
        category: 'Compensation',
        description: `Significant disparity detected in compensation across ${category.toLowerCase()} groups`,
        severity: disparity.severity,
        recommendations: [
          'Conduct comprehensive pay equity analysis',
          'Review compensation policies and practices',
          'Implement structured salary bands',
          'Regular pay equity audits',
        ],
      };
    }
  }

  return null;
};

// Helper functions for statistical analysis
const groupReviewsByDemographic = (employees: any[], reviews: any[], category: string) => {
  // Implementation for grouping reviews by demographic category
  return {};
};

const groupPromotionsByDemographic = (employees: any[], promotions: any[], category: string) => {
  // Implementation for grouping promotions by demographic category
  return {};
};

const groupSalariesByDemographic = (employees: any[], salaries: any[], category: string) => {
  // Implementation for grouping salaries by demographic category
  return {};
};

const checkRatingDisparity = (groupedReviews: any) => {
  // Implementation for checking rating disparities
  return { hasSignificantDisparity: false, severity: 'LOW' as const };
};

const checkPromotionDisparity = (groupedPromotions: any) => {
  // Implementation for checking promotion disparities
  return { hasSignificantDisparity: false, severity: 'LOW' as const };
};

const checkCompensationDisparity = (groupedSalaries: any) => {
  // Implementation for checking compensation disparities
  return { hasSignificantDisparity: false, severity: 'LOW' as const };
};
```