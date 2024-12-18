import { Role } from '../auth';

export type AccidentSeverity = 'MINOR' | 'MODERATE' | 'SERIOUS' | 'CRITICAL';
export type AccidentStatus = 'REPORTED' | 'INVESTIGATING' | 'ACC_LODGED' | 'CLOSED';

export interface AccidentReport {
  id: string;
  employeeId: string;
  date: string;
  time: string;
  location: string;
  description: string;
  severity: AccidentSeverity;
  status: AccidentStatus;
  injuryType?: string;
  treatmentRequired?: string;
  witnesses?: string[];
  accNumber?: string;
  investigation?: {
    assignedTo: string;
    findings: string;
    recommendations: string[];
    completedAt: string;
  };
  documents: {
    id: string;
    type: string;
    url: string;
    uploadedAt: string;
  }[];
  followUp?: {
    requiredActions: string[];
    dueDate: string;
    completedAt?: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  accessRoles: Role[];
}

export interface CreateAccidentReportData {
  employeeId: string;
  date: string;
  time: string;
  location: string;
  description: string;
  severity: AccidentSeverity;
  injuryType?: string;
  treatmentRequired?: string;
  witnesses?: string[];
  documents?: File[];
  accessRoles: Role[];
}