import { Role } from '../auth';
import { SafetyTrainingType } from './training';

export type SafetyCertificateStatus = 'ACTIVE' | 'EXPIRED' | 'EXPIRING_SOON' | 'REVOKED';

export interface SafetyCertificate {
  id: string;
  employeeId: string;
  type: SafetyTrainingType;
  certificateNumber?: string;
  issueDate: string;
  expiryDate?: string;
  status: SafetyCertificateStatus;
  provider: string;
  verificationUrl?: string;
  documents: {
    id: string;
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  reminders: {
    type: 'EXPIRY_WARNING' | 'EXPIRED' | 'RENEWAL_REQUIRED';
    sentAt: string;
    status: 'PENDING' | 'ACTIONED';
  }[];
  createdAt: string;
  updatedAt: string;
  accessRoles: Role[];
}

export interface CreateSafetyCertificateData {
  employeeId: string;
  type: SafetyTrainingType;
  certificateNumber?: string;
  issueDate: string;
  expiryDate?: string;
  provider: string;
  verificationUrl?: string;
  accessRoles: Role[];
}