import { atom } from 'jotai';
import { Timesheet } from '../types/timesheet';

export const timesheetsAtom = atom<Timesheet[]>([
  {
    id: '1',
    employeeId: 'emp1',
    organizationId: '1',
    periodStart: '2024-03-01',
    periodEnd: '2024-03-15',
    status: 'PENDING',
    entries: [],
    totalRegularHours: 80,
    totalOvertimeHours: 5,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
]);

export const createTimesheet = (
  employeeId: string,
  organizationId: string,
  periodStart: string,
  periodEnd: string
): Timesheet => {
  const timesheet: Timesheet = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    organizationId,
    periodStart,
    periodEnd,
    status: 'DRAFT',
    entries: [],
    totalRegularHours: 0,
    totalOvertimeHours: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  timesheetsAtom.init = [...timesheetsAtom.init, timesheet];
  return timesheet;
};