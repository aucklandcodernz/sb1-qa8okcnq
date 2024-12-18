import { Role } from './auth';

export type OnboardingStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskCategory = 'PAPERWORK' | 'IT_SETUP' | 'TRAINING' | 'INTRODUCTION' | 'COMPLIANCE';

export interface OnboardingTask {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  category: TaskCategory;
  dueDate: string;
  assignedTo: Role;
  status: OnboardingStatus;
  completedAt?: string;
  notes?: string[];
}

export interface OnboardingChecklist {
  id: string;
  employeeId: string;
  startDate: string;
  tasks: OnboardingTask[];
  progress: number;
  status: OnboardingStatus;
  mentor?: {
    id: string;
    name: string;
    role: string;
  };
}

export interface CreateTaskData {
  title: string;
  description: string;
  category: TaskCategory;
  dueDate: string;
  assignedTo: Role;
}