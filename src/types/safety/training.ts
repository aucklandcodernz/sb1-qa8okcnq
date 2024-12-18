export type SafetyTrainingType = 'INDUCTION' | 'FIRST_AID' | 'FIRE_SAFETY' | 'HAZARD' | 'MANUAL_HANDLING' | 'EMERGENCY_RESPONSE';
export type SafetyTrainingStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface SafetyTraining {
  id: string;
  employeeId: string;
  type: SafetyTrainingType;
  status: SafetyTrainingStatus;
  scheduledDate: string;
  completedDate?: string;
  instructor?: {
    id: string;
    name: string;
    qualification: string;
  };
  location?: string;
  notes?: string;
  certificate?: {
    id: string;
    type: SafetyTrainingType;
    issueDate: string;
    expiryDate?: string;
    provider: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateSafetyTrainingData {
  employeeId: string;
  type: SafetyTrainingType;
  scheduledDate: string;
  instructor?: {
    id: string;
    name: string;
    qualification: string;
  };
  location?: string;
  notes?: string;
}