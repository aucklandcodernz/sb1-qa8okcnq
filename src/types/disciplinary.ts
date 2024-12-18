import { Role } from './auth';

export type DisciplinaryStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'APPEALED';
export type DisciplinaryType = 'VERBAL_WARNING' | 'WRITTEN_WARNING' | 'FINAL_WARNING' | 'INVESTIGATION' | 'TERMINATION';
export type DisciplinaryOutcome = 'NO_ACTION' | 'WARNING_ISSUED' | 'SUSPENSION' | 'TERMINATION' | 'CLEARED';

export interface DisciplinaryCase {
  id: string;
  employeeId: string;
  type: DisciplinaryType;
  status: DisciplinaryStatus;
  issueDate: string;
  description: string;
  category: string;
  witnesses?: string[];
  evidence?: {
    id: string;
    type: string;
    url: string;
    uploadedAt: string;
    uploadedBy: string;
  }[];
  meetings: {
    id: string;
    date: string;
    attendees: string[];
    notes: string;
    outcome?: string;
  }[];
  warnings: {
    id: string;
    type: DisciplinaryType;
    issueDate: string;
    expiryDate?: string;
    issuedBy: string;
    details: string;
  }[];
  outcome?: {
    decision: DisciplinaryOutcome;
    date: string;
    details: string;
    decidedBy: string;
    appealDeadline?: string;
  };
  appeal?: {
    date: string;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    reviewedBy?: string;
    decision?: string;
    decisionDate?: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  confidentialityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  accessRoles: Role[];
}

export interface CreateDisciplinaryData {
  employeeId: string;
  type: DisciplinaryType;
  description: string;
  category: string;
  witnesses?: string[];
  confidentialityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  accessRoles: Role[];
}