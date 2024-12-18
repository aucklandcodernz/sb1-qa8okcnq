import { Role } from './auth';

export type VisaStatus = 'ACTIVE' | 'EXPIRED' | 'EXPIRING_SOON' | 'CANCELLED';
export type VisaType = 'WORK' | 'STUDENT' | 'RESIDENT' | 'PERMANENT_RESIDENT';

export interface VisaDetails {
  id: string;
  employeeId: string;
  type: VisaType;
  visaNumber: string;
  status: VisaStatus;
  startDate: string;
  expiryDate: string;
  conditions?: string[];
  workRights: {
    maxHoursPerWeek?: number;
    restrictions?: string[];
  };
  documents: {
    id: string;
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  verificationStatus: 'PENDING' | 'VERIFIED' | 'FAILED';
  verifiedAt?: string;
  verifiedBy?: string;
  notifications: {
    type: 'EXPIRY_WARNING' | 'EXPIRED' | 'VERIFICATION_REQUIRED';
    sentAt: string;
    status: 'PENDING' | 'ACTIONED';
  }[];
  createdAt: string;
  updatedAt: string;
  accessRoles: Role[];
}

export interface CreateVisaData {
  employeeId: string;
  type: VisaType;
  visaNumber: string;
  startDate: string;
  expiryDate: string;
  conditions?: string[];
  workRights: VisaDetails['workRights'];
  accessRoles: Role[];
}