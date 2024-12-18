import { addHours, differenceInHours, differenceInMinutes, isAfter, isBefore } from 'date-fns';
import { BREAK_REQUIREMENTS, WORKING_HOUR_LIMITS, YOUNG_WORKER_RESTRICTIONS } from './constants';
import { TimeEntry } from '../../types/attendance';

export interface ComplianceCheck {
  isCompliant: boolean;
  issues: string[];
}

export interface BreakCompliance extends ComplianceCheck {
  missedBreaks: {
    type: 'REST_BREAK' | 'MEAL_BREAK';
    requiredAt: Date;
  }[];
}

export const checkBreakCompliance = (
  timeEntry: TimeEntry,
  breaks: { startTime: string; endTime: string; type: 'REST_BREAK' | 'MEAL_BREAK' }[]
): BreakCompliance => {
  const issues: string[] = [];
  const missedBreaks: BreakCompliance['missedBreaks'] = [];
  const shiftStart = new Date(`${timeEntry.date}T${timeEntry.clockIn}`);
  const shiftEnd = timeEntry.clockOut 
    ? new Date(`${timeEntry.date}T${timeEntry.clockOut}`)
    : new Date();

  // Check rest breaks (10-minute breaks)
  const hoursWorked = differenceInHours(shiftEnd, shiftStart);
  const requiredRestBreaks = Math.floor(hoursWorked / BREAK_REQUIREMENTS.REST_BREAK.HOURS_THRESHOLD);
  const actualRestBreaks = breaks.filter(b => b.type === 'REST_BREAK').length;

  if (actualRestBreaks < requiredRestBreaks) {
    issues.push(`Missing ${requiredRestBreaks - actualRestBreaks} required rest breaks`);
    // Calculate when breaks should have been taken
    for (let i = 1; i <= requiredRestBreaks; i++) {
      const requiredAt = addHours(shiftStart, i * BREAK_REQUIREMENTS.REST_BREAK.HOURS_THRESHOLD);
      if (!breaks.some(b => {
        const breakStart = new Date(`${timeEntry.date}T${b.startTime}`);
        const breakEnd = new Date(`${timeEntry.date}T${b.endTime}`);
        return b.type === 'REST_BREAK' && 
          isAfter(breakStart, requiredAt) && 
          isBefore(breakEnd, addHours(requiredAt, 1));
      })) {
        missedBreaks.push({
          type: 'REST_BREAK',
          requiredAt,
        });
      }
    }
  }

  // Check meal breaks (30-minute breaks)
  if (hoursWorked >= BREAK_REQUIREMENTS.MEAL_BREAK.HOURS_THRESHOLD) {
    const hasMealBreak = breaks.some(b => 
      b.type === 'MEAL_BREAK' && 
      differenceInMinutes(
        new Date(`${timeEntry.date}T${b.endTime}`),
        new Date(`${timeEntry.date}T${b.startTime}`)
      ) >= BREAK_REQUIREMENTS.MEAL_BREAK.DURATION
    );

    if (!hasMealBreak) {
      issues.push('Missing required meal break');
      missedBreaks.push({
        type: 'MEAL_BREAK',
        requiredAt: addHours(shiftStart, BREAK_REQUIREMENTS.MEAL_BREAK.HOURS_THRESHOLD),
      });
    }
  }

  return {
    isCompliant: issues.length === 0,
    issues,
    missedBreaks,
  };
};

export const checkWorkingHourLimits = (
  timeEntries: TimeEntry[],
  employeeAge?: number
): ComplianceCheck => {
  const issues: string[] = [];
  const isYoungWorker = employeeAge && employeeAge < YOUNG_WORKER_RESTRICTIONS.MIN_AGE;

  // Group entries by week
  const weeklyHours: Record<string, number> = {};
  timeEntries.forEach(entry => {
    const weekStart = new Date(entry.date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of week
    const weekKey = weekStart.toISOString().split('T')[0];
    
    const hours = entry.clockOut
      ? differenceInHours(
          new Date(`${entry.date}T${entry.clockOut}`),
          new Date(`${entry.date}T${entry.clockIn}`)
        )
      : 0;
    
    weeklyHours[weekKey] = (weeklyHours[weekKey] || 0) + hours;
  });

  // Check weekly limits
  Object.entries(weeklyHours).forEach(([week, hours]) => {
    const limit = isYoungWorker 
      ? YOUNG_WORKER_RESTRICTIONS.MAX_WEEKLY_HOURS
      : WORKING_HOUR_LIMITS.WEEKLY.MAXIMUM;
    
    if (hours > limit) {
      issues.push(`Exceeded weekly hour limit (${hours}/${limit} hours) for week of ${week}`);
    }
  });

  // Check daily limits and rest periods
  for (let i = 1; i < timeEntries.length; i++) {
    const prevEntry = timeEntries[i - 1];
    const currentEntry = timeEntries[i];

    if (prevEntry.clockOut && currentEntry.clockIn) {
      const restPeriod = differenceInHours(
        new Date(`${currentEntry.date}T${currentEntry.clockIn}`),
        new Date(`${prevEntry.date}T${prevEntry.clockOut}`)
      );

      const minRest = isYoungWorker
        ? YOUNG_WORKER_RESTRICTIONS.MIN_REST_PERIOD
        : WORKING_HOUR_LIMITS.REST_PERIOD.BETWEEN_SHIFTS;

      if (restPeriod < minRest) {
        issues.push(`Insufficient rest period (${restPeriod}/${minRest} hours) between shifts on ${prevEntry.date} and ${currentEntry.date}`);
      }
    }
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  };
};

export const checkYoungWorkerCompliance = (
  timeEntry: TimeEntry,
  workType?: string
): ComplianceCheck => {
  const issues: string[] = [];

  // Check prohibited work types
  if (workType && YOUNG_WORKER_RESTRICTIONS.PROHIBITED_WORK_TYPES.includes(workType)) {
    issues.push(`Work type "${workType}" is not permitted for workers under 18`);
  }

  // Check daily hours
  if (timeEntry.clockOut) {
    const hoursWorked = differenceInHours(
      new Date(`${timeEntry.date}T${timeEntry.clockOut}`),
      new Date(`${timeEntry.date}T${timeEntry.clockIn}`)
    );

    if (hoursWorked > YOUNG_WORKER_RESTRICTIONS.MAX_DAILY_HOURS) {
      issues.push(`Daily hours (${hoursWorked}) exceed maximum allowed (${YOUNG_WORKER_RESTRICTIONS.MAX_DAILY_HOURS}) for workers under 18`);
    }
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  };
};