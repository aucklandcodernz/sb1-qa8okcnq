import { TimeEntry } from '../../types/attendance';
import { checkBreakCompliance, checkWorkingHourLimits, checkYoungWorkerCompliance } from '../workHours/compliance';

export interface TimeCompliance {
  breakCompliance: ReturnType<typeof checkBreakCompliance>;
  hoursCompliance: ReturnType<typeof checkWorkingHourLimits>;
  youngWorkerCompliance: ReturnType<typeof checkYoungWorkerCompliance>;
}

export const checkTimeEntryCompliance = (
  timeEntry: TimeEntry | undefined,
  breaks: { startTime: string; endTime: string; type: 'REST_BREAK' | 'MEAL_BREAK' }[],
  weeklyTimeEntries: TimeEntry[],
  employeeAge?: number
): TimeCompliance => {
  const defaultEntry = timeEntry || {
    id: '',
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    clockIn: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    status: 'PRESENT' as const,
  };

  const breakCompliance = checkBreakCompliance(defaultEntry, breaks);
  const hoursCompliance = checkWorkingHourLimits(weeklyTimeEntries, employeeAge);
  const youngWorkerCompliance = employeeAge && employeeAge < 18
    ? checkYoungWorkerCompliance(defaultEntry)
    : { isCompliant: true, issues: [] };

  return {
    breakCompliance,
    hoursCompliance,
    youngWorkerCompliance,
  };
};