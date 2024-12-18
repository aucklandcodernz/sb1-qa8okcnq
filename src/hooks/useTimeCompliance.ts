import { useMemo } from 'react';
import { TimeEntry } from '../types/attendance';
import { checkTimeEntryCompliance, TimeCompliance } from '../lib/attendance/compliance';

interface UseTimeComplianceProps {
  timeEntry?: TimeEntry;
  breaks?: { startTime: string; endTime: string; type: 'REST_BREAK' | 'MEAL_BREAK' }[];
  weeklyTimeEntries?: TimeEntry[];
  employeeAge?: number;
}

export const useTimeCompliance = ({
  timeEntry,
  breaks = [],
  weeklyTimeEntries = [],
  employeeAge,
}: UseTimeComplianceProps): TimeCompliance => {
  return useMemo(() => 
    checkTimeEntryCompliance(timeEntry, breaks, weeklyTimeEntries, employeeAge),
    [timeEntry?.clockIn, timeEntry?.clockOut, breaks, weeklyTimeEntries.length, employeeAge]
  );
};