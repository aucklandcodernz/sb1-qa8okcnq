import { Role } from './auth';

export type AgreementStatus = 'DRAFT' | 'PENDING_SIGNATURE' | 'SIGNED' | 'EXPIRED' | 'TERMINATED';
export type AgreementType = 'PERMANENT' | 'FIXED_TERM' | 'CASUAL' | 'CONTRACTOR';

export interface EmploymentAgreement {
  id: string;
  employeeId: string;
  type: AgreementType;
  status: AgreementStatus;
  startDate: string;
  endDate?: string;
  position: string;
  department: string;
  salary: {
    amount: number;
    currency: string;
    frequency: 'HOURLY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY';
  };
  workingHours: {
    hoursPerWeek: number;
    daysPerWeek: number;
    standardHours: {
      start: string;
      end: string;
    };
  };
  benefits: {
    type: string;
    description: string;
  }[];
  terms: {
    section: string;
    content: string;
  }[];
  signatures: {
    employeeSignature?: {
      signedAt: string;
      ipAddress?: string;
    };
    employerSignature?: {
      signedBy: string;
      signedAt: string;
      ipAddress?: string;
    };
  };
  version: number;
  createdAt: string;
  updatedAt: string;
  reminders: {
    type: 'SIGNATURE_REQUIRED' | 'EXPIRING_SOON' | 'REVIEW_DUE';
    sentAt: string;
    status: 'PENDING' | 'ACTIONED';
  }[];
  accessRoles: Role[];
}

export interface CreateAgreementData {
  employeeId: string;
  type: AgreementType;
  startDate: string;
  endDate?: string;
  position: string;
  department: string;
  salary: EmploymentAgreement['salary'];
  workingHours: EmploymentAgreement['workingHours'];
  benefits?: EmploymentAgreement['benefits'];
  terms?: EmploymentAgreement['terms'];
  accessRoles: Role[];
}