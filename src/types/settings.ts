import { z } from 'zod';

export type NotificationChannel = 'EMAIL' | 'IN_APP' | 'SMS';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
export type TimeFormat = '12' | '24';

export interface SystemSettings {
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  defaultLanguage: string;
  notificationChannels: NotificationChannel[];
  passwordPolicy: {
    minLength: number;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    requireUppercase: boolean;
    expiryDays: number;
  };
  sessionTimeout: number; // in minutes
}

export interface OrganizationSettings {
  id: string;
  organizationId: string;
  workingHours: {
    start: string;
    end: string;
    workDays: number[]; // 0-6, where 0 is Sunday
  };
  leavePolicy: {
    annualLeaveQuota: number;
    sickLeaveQuota: number;
    carryOverLimit: number;
    minNoticeDays: number;
  };
  approvalChain: {
    leaveRequests: string[];
    expenses: string[];
    timeoff: string[];
  };
}

export const systemSettingsSchema = z.object({
  dateFormat: z.enum(['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']),
  timeFormat: z.enum(['12', '24']),
  defaultLanguage: z.string(),
  notificationChannels: z.array(z.enum(['EMAIL', 'IN_APP', 'SMS'])),
  passwordPolicy: z.object({
    minLength: z.number().min(8).max(32),
    requireNumbers: z.boolean(),
    requireSpecialChars: z.boolean(),
    requireUppercase: z.boolean(),
    expiryDays: z.number().min(0),
  }),
  sessionTimeout: z.number().min(5).max(1440),
});

export const organizationSettingsSchema = z.object({
  workingHours: z.object({
    start: z.string(),
    end: z.string(),
    workDays: z.array(z.number().min(0).max(6)),
  }),
  leavePolicy: z.object({
    annualLeaveQuota: z.number().min(0),
    sickLeaveQuota: z.number().min(0),
    carryOverLimit: z.number().min(0),
    minNoticeDay: z.number().min(0),
  }),
  approvalChain: z.object({
    leaveRequests: z.array(z.string()),
    expenses: z.array(z.string()),
    timeoff: z.array(z.string()),
  }),
});