import { atom } from 'jotai';
import { Role } from '../../types/auth';

export interface BenefitPlan {
  id: string;
  type: 'HEALTH' | 'DENTAL' | 'VISION' | 'LIFE' | 'DISABILITY' | 'RETIREMENT';
  name: string;
  provider: string;
  description: string;
  cost: {
    employee: number;
    employer: number;
  };
  coverageDetails: Record<string, any>;
  eligibilityRules: {
    minServiceMonths?: number;
    employmentTypes: string[];
    roles: Role[];
  };
  enrollmentPeriod?: {
    start: string;
    end: string;
  };
}

export interface BenefitEnrollment {
  id: string;
  employeeId: string;
  planId: string;
  status: 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'TERMINATED';
  coverageType: 'INDIVIDUAL' | 'FAMILY';
  startDate: string;
  endDate?: string;
  dependents?: {
    name: string;
    relationship: string;
    dateOfBirth: string;
  }[];
  selections?: Record<string, any>;
  documents: {
    id: string;
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export const benefitPlansAtom = atom<BenefitPlan[]>([]);
export const benefitEnrollmentsAtom = atom<BenefitEnrollment[]>([]);

export const getEmployeeBenefits = (employeeId: string): BenefitEnrollment[] => {
  return benefitEnrollmentsAtom.init.filter(
    enrollment => enrollment.employeeId === employeeId
  );
};

export const getEligiblePlans = (
  employeeId: string,
  employmentType: string,
  role: Role,
  serviceMonths: number
): BenefitPlan[] => {
  return benefitPlansAtom.init.filter(plan => {
    const { eligibilityRules } = plan;
    return (
      (!eligibilityRules.minServiceMonths || serviceMonths >= eligibilityRules.minServiceMonths) &&
      eligibilityRules.employmentTypes.includes(employmentType) &&
      eligibilityRules.roles.includes(role)
    );
  });
};

export const enrollInBenefit = (
  employeeId: string,
  planId: string,
  data: Partial<BenefitEnrollment>
): BenefitEnrollment => {
  const enrollment: BenefitEnrollment = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    planId,
    status: 'PENDING',
    coverageType: data.coverageType || 'INDIVIDUAL',
    startDate: data.startDate || new Date().toISOString(),
    dependents: data.dependents || [],
    selections: data.selections || {},
    documents: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  benefitEnrollmentsAtom.init = [...benefitEnrollmentsAtom.init, enrollment];
  return enrollment;
};

export const updateBenefitEnrollment = (
  enrollmentId: string,
  updates: Partial<BenefitEnrollment>
): void => {
  benefitEnrollmentsAtom.init = benefitEnrollmentsAtom.init.map(enrollment =>
    enrollment.id === enrollmentId
      ? {
          ...enrollment,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : enrollment
  );
};

export const terminateBenefitEnrollment = (
  enrollmentId: string,
  endDate: string
): void => {
  benefitEnrollmentsAtom.init = benefitEnrollmentsAtom.init.map(enrollment =>
    enrollment.id === enrollmentId
      ? {
          ...enrollment,
          status: 'TERMINATED',
          endDate,
          updatedAt: new Date().toISOString(),
        }
      : enrollment
  );
};

export const addBenefitDocument = (
  enrollmentId: string,
  document: {
    type: string;
    url: string;
  }
): void => {
  benefitEnrollmentsAtom.init = benefitEnrollmentsAtom.init.map(enrollment =>
    enrollment.id === enrollmentId
      ? {
          ...enrollment,
          documents: [
            ...enrollment.documents,
            {
              id: Math.random().toString(36).substr(2, 9),
              ...document,
              uploadedAt: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : enrollment
  );
};