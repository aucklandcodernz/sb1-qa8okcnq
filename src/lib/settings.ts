import { atom } from 'jotai';
import { SystemSettings, OrganizationSettings } from '../types/settings';

export const systemSettingsAtom = atom<SystemSettings>({
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '24',
  defaultLanguage: 'en',
  notificationChannels: ['EMAIL', 'IN_APP'],
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true,
    expiryDays: 90,
  },
  sessionTimeout: 30,
});

export const organizationSettingsAtom = atom<Record<string, OrganizationSettings>>({
  '1': {
    id: '1',
    organizationId: '1',
    workingHours: {
      start: '09:00',
      end: '17:00',
      workDays: [1, 2, 3, 4, 5], // Monday to Friday
    },
    leavePolicy: {
      annualLeaveQuota: 20,
      sickLeaveQuota: 10,
      carryOverLimit: 5,
      minNoticeDay: 14,
    },
    approvalChain: {
      leaveRequests: ['DEPT_MANAGER', 'HR_MANAGER'],
      expenses: ['DEPT_MANAGER', 'ORG_ADMIN'],
      timeoff: ['SUPERVISOR', 'DEPT_MANAGER'],
    },
  },
});