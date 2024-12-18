import { addDays, differenceInDays, isWeekend } from 'date-fns';
import { 
  HOLIDAY_PAY_RATES, 
  ALTERNATIVE_HOLIDAY, 
  MINIMUM_DAILY_PAY,
  PUBLIC_HOLIDAYS_2024,
  MONDAYISATION_RULES 
} from './constants';
import { TimeEntry } from '../../../types/attendance';

export interface HolidayPayCalculation {
  amount: number;
  alternativeDay: boolean;
  breakdown: {
    baseRate: number;
    holidayRate: number;
    alternativeDayRate?: number;
  };
}

export const calculateHolidayPay = (
  hourlyRate: number,
  hoursWorked: number,
  isPublicHoliday: boolean = false,
  includeAlternativeDay: boolean = false
): HolidayPayCalculation => {
  const baseRate = hourlyRate;
  const holidayRate = isPublicHoliday ? HOLIDAY_PAY_RATES.TIME_AND_A_HALF : HOLIDAY_PAY_RATES.REGULAR;
  
  const amount = hourlyRate * hoursWorked * holidayRate;

  return {
    amount,
    alternativeDay: isPublicHoliday && includeAlternativeDay && ALTERNATIVE_HOLIDAY.ELIGIBLE_IF_WORKING,
    breakdown: {
      baseRate,
      holidayRate,
      alternativeDayRate: includeAlternativeDay ? HOLIDAY_PAY_RATES.REGULAR : undefined,
    },
  };
};

export const calculateAverageDailyPay = (
  timeEntries: TimeEntry[],
  weeksToConsider: number = MINIMUM_DAILY_PAY.CALCULATION_WEEKS
): number => {
  const cutoffDate = addDays(new Date(), -weeksToConsider * 7);
  const relevantEntries = timeEntries.filter(entry => 
    new Date(entry.date) >= cutoffDate
  );

  if (relevantEntries.length === 0) return 0;

  const totalHours = relevantEntries.reduce((sum, entry) => {
    if (!entry.clockOut) return sum;
    const hours = differenceInDays(
      new Date(`${entry.date}T${entry.clockOut}`),
      new Date(`${entry.date}T${entry.clockIn}`)
    ) / 24;
    return sum + hours;
  }, 0);

  const totalDays = relevantEntries.length;
  return totalHours / totalDays;
};

export const calculateMondayisation = (holiday: typeof PUBLIC_HOLIDAYS_2024[0]): Date => {
  const holidayDate = new Date(holiday.date);
  
  if (MONDAYISATION_RULES.APPLIES_TO_WEEKEND && 
      MONDAYISATION_RULES.ELIGIBLE_HOLIDAYS.includes(holiday.name) &&
      isWeekend(holidayDate)) {
    // Move to Monday if it's a Saturday
    if (holidayDate.getDay() === 6) {
      return addDays(holidayDate, 2);
    }
    // Move to Monday if it's a Sunday
    if (holidayDate.getDay() === 0) {
      return addDays(holidayDate, 1);
    }
  }
  
  return holidayDate;
};

export const isPublicHoliday = (date: Date): boolean => {
  const dateString = date.toISOString().split('T')[0];
  return PUBLIC_HOLIDAYS_2024.some(holiday => {
    const mondayisedDate = calculateMondayisation(holiday);
    return mondayisedDate.toISOString().split('T')[0] === dateString;
  });
};

export const getPublicHolidaysInRange = (
  startDate: Date,
  endDate: Date
): typeof PUBLIC_HOLIDAYS_2024 => {
  return PUBLIC_HOLIDAYS_2024.filter(holiday => {
    const holidayDate = calculateMondayisation(holiday);
    return holidayDate >= startDate && holidayDate <= endDate;
  });
};

export const calculateAlternativeHolidayExpiry = (
  originalHolidayDate: Date
): Date => {
  return addDays(originalHolidayDate, ALTERNATIVE_HOLIDAY.EXPIRY_MONTHS * 30);
};

export const validateAlternativeHolidayEligibility = (
  employeeId: string,
  holidayDate: Date,
  normalWorkDays: number[]
): {
  isEligible: boolean;
  reason?: string;
} => {
  // Check if the holiday falls on a normal working day
  const isNormalWorkDay = normalWorkDays.includes(holidayDate.getDay());
  
  if (!isNormalWorkDay) {
    return {
      isEligible: false,
      reason: 'Holiday does not fall on a normal working day',
    };
  }

  return { isEligible: true };
};