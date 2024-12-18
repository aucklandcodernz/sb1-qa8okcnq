```typescript
import { Role } from './auth';

export type DemographicCategory = 
  | 'GENDER'
  | 'ETHNICITY'
  | 'AGE_GROUP'
  | 'DISABILITY'
  | 'SEXUAL_ORIENTATION'
  | 'RELIGION'
  | 'NATIONALITY';

export type DemographicData = {
  [K in DemographicCategory]?: string;
};

export interface EEOReport {
  id: string;
  organizationId: string;
  reportingPeriod: {
    startDate: string;
    endDate: string;
  };
  demographics: {
    category: DemographicCategory;
    distribution: {
      value: string;
      count: number;
      percentage: number;
    }[];
  }[];
  trends: {
    category: DemographicCategory;
    changes: {
      value: string;
      previousPeriod: number;
      currentPeriod: number;
      percentageChange: number;
    }[];
  }[];
  biasIndicators: {
    category: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    recommendations: string[];
  }[];
  createdAt: string;
  updatedAt: string;
  accessRoles: Role[];
}

export interface BiasAnalysis {
  promotions: {
    category: DemographicCategory;
    distribution: {
      group: string;
      total: number;
      promoted: number;
      rate: number;
      averageTimeToPromotion: number;
    }[];
    hasSignificantDisparity: boolean;
  }[];
  performance: {
    category: DemographicCategory;
    distribution: {
      group: string;
      averageRating: number;
      ratingDistribution: {
        rating: number;
        count: number;
        percentage: number;
      }[];
    }[];
    hasSignificantDisparity: boolean;
  }[];
  compensation: {
    category: DemographicCategory;
    distribution: {
      group: string;
      averageSalary: number;
      medianSalary: number;
      payGap: number;
    }[];
    hasSignificantDisparity: boolean;
  }[];
  recommendations: {
    category: string;
    description: string;
    suggestedActions: string[];
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
}
```