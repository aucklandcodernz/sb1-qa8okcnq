import { User } from './auth';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';
export type ShiftType = 'REGULAR' | 'NIGHT' | 'FLEXIBLE' | 'CUSTOM';

export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  status: AttendanceStatus;
  notes?: string;
  overtime?: number; // in minutes
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  shiftId?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  halfDays: number;
  totalOvertime: number; // in minutes
  records: TimeEntry[];
}

export interface WorkSchedule {
  id: string;
  employeeId: string;
  dayOfWeek: number; // 0-6, where 0 is Sunday
  startTime: string;
  endTime: string;
  isWorkingDay: boolean;
  shiftType: ShiftType;
  breakDuration: number; // in minutes
  flexibleHours?: {
    minHours: number;
    coreStartTime: string;
    coreEndTime: string;
  };
}

export interface ShiftSwapRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  shiftDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}