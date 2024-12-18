import { Role } from './auth';

export type TimesheetStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
export type TimeEntryType = 'REGULAR' | 'OVERTIME' | 'ON_CALL' | 'TRAINING';

export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: TimeEntryType;
  projectId?: string;
  taskId?: string;
  description?: string;
  breaks: {
    startTime: string;
    endTime: string;
    type: 'REST_BREAK' | 'MEAL_BREAK';
  }[];
  totalHours: number;
  overtimeHours: number;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  organizationId: string;
  periodStart: string;
  periodEnd: string;
  status: TimesheetStatus;
  entries: TimeEntry[];
  totalRegularHours: number;
  totalOvertimeHours: number;
  submittedAt?: string;
  submittedBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  comments?: {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
  }[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface TimesheetSummary {
  employeeId: string;
  period: {
    start: string;
    end: string;
  };
  totalDays: number;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  projects?: {
    id: string;
    name: string;
    hours: number;
  }[];
  status: TimesheetStatus;
}