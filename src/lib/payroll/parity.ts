```typescript
import { Role } from '../types/auth';

export interface PayParityAnalysis {
  id: string;
  organizationId: string;
  role: string;
  department: string;
  averageSalary: number;
  medianSalary: number;
  salaryRange: {
    min: number;
    max: number;
  };
  distribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
  disparityFactors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  recommendations: string[];
  createdAt: string;
}

export interface SalaryData {
  employeeId: string;
  role: string;
  department: string;
  salary: number;
  startDate: string;
  yearsOfExperience: number;
  qualifications: string[];
}

export const analyzeSalaryParity = (
  salaryData: SalaryData[],
  role: string,
  department: string
): PayParityAnalysis => {
  const roleSalaries = salaryData.filter(
    data => data.role === role && data.department === department
  );

  const salaries = roleSalaries.map(data => data.salary);
  const averageSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
  const medianSalary = calculateMedian(salaries);

  const disparityFactors = analyzeDisparityFactors(roleSalaries);
  const recommendations = generateRecommendations(disparityFactors);

  return {
    id: Math.random().toString(36).substr(2, 9),
    organizationId: '1', // This should come from context
    role,
    department,
    averageSalary,
    medianSalary,
    salaryRange: {
      min: Math.min(...salaries),
      max: Math.max(...salaries),
    },
    distribution: calculateSalaryDistribution(salaries),
    disparityFactors,
    recommendations,
    createdAt: new Date().toISOString(),
  };
};

const calculateMedian = (numbers: number[]): number => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

const calculateSalaryDistribution = (salaries: number[]): PayParityAnalysis['distribution'] => {
  const min = Math.min(...salaries);
  const max = Math.max(...salaries);
  const range = max - min;
  const bucketSize = range / 5;

  const buckets = Array(5).fill(0);
  salaries.forEach(salary => {
    const bucketIndex = Math.min(
      Math.floor((salary - min) / bucketSize),
      4
    );
    buckets[bucketIndex]++;
  });

  return buckets.map((count, index) => ({
    range: `${formatCurrency(min + bucketSize * index)} - ${formatCurrency(min + bucketSize * (index + 1))}`,
    count,
    percentage: (count / salaries.length) * 100,
  }));
};

const analyzeDisparityFactors = (
  salaryData: SalaryData[]
): PayParityAnalysis['disparityFactors'] => {
  const factors: PayParityAnalysis['disparityFactors'] = [];

  // Analyze experience impact
  const experienceImpact = analyzeExperienceImpact(salaryData);
  if (experienceImpact.impact > 0.1) {
    factors.push(experienceImpact);
  }

  // Analyze qualifications impact
  const qualificationsImpact = analyzeQualificationsImpact(salaryData);
  if (qualificationsImpact.impact > 0.1) {
    factors.push(qualificationsImpact);
  }

  // Analyze tenure impact
  const tenureImpact = analyzeTenureImpact(salaryData);
  if (tenureImpact.impact > 0.1) {
    factors.push(tenureImpact);
  }

  return factors;
};

const analyzeExperienceImpact = (salaryData: SalaryData[]) => {
  // Calculate correlation between years of experience and salary
  const correlation = calculateCorrelation(
    salaryData.map(d => d.yearsOfExperience),
    salaryData.map(d => d.salary)
  );

  return {
    factor: 'Experience',
    impact: Math.abs(correlation),
    description: `Years of experience explains ${(Math.abs(correlation) * 100).toFixed(1)}% of salary variation`,
  };
};

const analyzeQualificationsImpact = (salaryData: SalaryData[]) => {
  // Calculate average salary by qualification level
  const qualificationSalaries = salaryData.reduce((acc, data) => {
    data.qualifications.forEach(qual => {
      if (!acc[qual]) {
        acc[qual] = { total: 0, count: 0 };
      }
      acc[qual].total += data.salary;
      acc[qual].count++;
    });
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const averages = Object.entries(qualificationSalaries).map(([qual, data]) => ({
    qualification: qual,
    average: data.total / data.count,
  }));

  const maxDiff = Math.max(...averages.map(a => a.average)) - Math.min(...averages.map(a => a.average));
  const impact = maxDiff / Math.max(...averages.map(a => a.average));

  return {
    factor: 'Qualifications',
    impact,
    description: `Qualification differences account for ${(impact * 100).toFixed(1)}% salary variation`,
  };
};

const analyzeTenureImpact = (salaryData: SalaryData[]) => {
  // Calculate correlation between tenure and salary
  const tenures = salaryData.map(d => 
    (new Date().getTime() - new Date(d.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
  
  const correlation = calculateCorrelation(
    tenures,
    salaryData.map(d => d.salary)
  );

  return {
    factor: 'Tenure',
    impact: Math.abs(correlation),
    description: `Company tenure explains ${(Math.abs(correlation) * 100).toFixed(1)}% of salary variation`,
  };
};

const calculateCorrelation = (x: number[], y: number[]): number => {
  const n = x.length;
  const sum_x = x.reduce((a, b) => a + b, 0);
  const sum_y = y.reduce((a, b) => a + b, 0);
  const sum_xy = x.reduce((acc, curr, i) => acc + curr * y[i], 0);
  const sum_xx = x.reduce((acc, curr) => acc + curr * curr, 0);
  const sum_yy = y.reduce((acc, curr) => acc + curr * curr, 0);

  const correlation = (n * sum_xy - sum_x * sum_y) /
    Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y));

  return correlation;
};

const generateRecommendations = (
  disparityFactors: PayParityAnalysis['disparityFactors']
): string[] => {
  const recommendations: string[] = [];

  if (disparityFactors.some(f => f.factor === 'Experience' && f.impact > 0.2)) {
    recommendations.push(
      'Review experience-based pay progression to ensure fairness',
      'Implement clear experience-based salary bands'
    );
  }

  if (disparityFactors.some(f => f.factor === 'Qualifications' && f.impact > 0.2)) {
    recommendations.push(
      'Develop transparent qualification-based pay criteria',
      'Review qualification requirements for roles'
    );
  }

  if (disparityFactors.some(f => f.factor === 'Tenure' && f.impact > 0.2)) {
    recommendations.push(
      'Review tenure-based pay increases',
      'Ensure market competitiveness for new hires'
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Continue monitoring pay equity',
      'Conduct regular market rate reviews'
    );
  }

  return recommendations;
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
```