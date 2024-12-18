import { addDays, differenceInDays, isWeekend } from 'date-fns';
import { publicHolidays } from './holidays';

export interface TerminationPay {
  finalSalary: number;
  unusedLeave: number;
  publicHolidays: number;
  notice: number;
  total: number;
  breakdown: {
    category: string;
    amount: number;
    details: string;
  }[];
}

export const calculateTerminationPay = (
  lastDay: Date,
  salary: {
    amount: number;
    frequency: 'HOURLY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY';
  },
  unusedLeaveHours: number,
  noticePeriodDays: number,
  workingDaysPerWeek: number = 5,
  hoursPerDay: number = 8
): TerminationPay => {
  // Calculate daily rate
  let dailyRate: number;
  switch (salary.frequency) {
    case 'HOURLY':
      dailyRate = salary.amount * hoursPerDay;
      break;
    case 'WEEKLY':
      dailyRate = salary.amount / workingDaysPerWeek;
      break;
    case 'FORTNIGHTLY':
      dailyRate = (salary.amount / 2) / workingDaysPerWeek;
      break;
    case 'MONTHLY':
      dailyRate = (salary.amount * 12) / (workingDaysPerWeek * 52);
      break;
    case 'ANNUALLY':
      dailyRate = salary.amount / (workingDaysPerWeek * 52);
      break;
  }

  // Calculate final salary (remaining days in pay period)
  const finalSalary = dailyRate * workingDaysPerWeek;

  // Calculate unused leave pay
  const hourlyRate = dailyRate / hoursPerDay;
  const unusedLeavePay = unusedLeaveHours * hourlyRate;

  // Calculate public holiday pay
  const publicHolidayPay = calculatePublicHolidayPay(
    lastDay,
    addDays(lastDay, noticePeriodDays),
    dailyRate
  );

  // Calculate notice period pay
  const noticePay = calculateNoticePeriodPay(
    lastDay,
    noticePeriodDays,
    dailyRate,
    workingDaysPerWeek
  );

  const total = finalSalary + unusedLeavePay + publicHolidayPay + noticePay;

  return {
    finalSalary,
    unusedLeave: unusedLeavePay,
    publicHolidays: publicHolidayPay,
    notice: noticePay,
    total,
    breakdown: [
      {
        category: 'Final Salary',
        amount: finalSalary,
        details: `${workingDaysPerWeek} working days`,
      },
      {
        category: 'Unused Leave',
        amount: unusedLeavePay,
        details: `${unusedLeaveHours} hours @ $${hourlyRate.toFixed(2)}/hour`,
      },
      {
        category: 'Public Holidays',
        amount: publicHolidayPay,
        details: 'During notice period',
      },
      {
        category: 'Notice Period',
        amount: noticePay,
        details: `${noticePeriodDays} days`,
      },
    ],
  };
};

const calculatePublicHolidayPay = (
  startDate: Date,
  endDate: Date,
  dailyRate: number
): number => {
  const holidays = publicHolidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= startDate && holidayDate <= endDate;
  });

  return holidays.length * dailyRate;
};

const calculateNoticePeriodPay = (
  startDate: Date,
  noticePeriodDays: number,
  dailyRate: number,
  workingDaysPerWeek: number
): number => {
  let workingDays = 0;
  let currentDate = startDate;

  for (let i = 0; i < noticePeriodDays; i++) {
    currentDate = addDays(currentDate, 1);
    if (!isWeekend(currentDate)) {
      workingDays++;
    }
  }

  return workingDays * dailyRate;
};

export const validateTerminationNotice = (
  employmentType: 'PERMANENT' | 'FIXED_TERM' | 'CASUAL',
  lengthOfService: number, // in months
  noticePeriod: number // in days
): {
  isValid: boolean;
  requiredNotice: number;
  shortfall: number;
} => {
  let requiredNotice: number;

  switch (employmentType) {
    case 'PERMANENT':
      if (lengthOfService < 6) {
        requiredNotice = 7; // 1 week
      } else if (lengthOfService < 12) {
        requiredNotice = 14; // 2 weeks
      } else {
        requiredNotice = 28; // 4 weeks
      }
      break;
    case 'FIXED_TERM':
      requiredNotice = 14; // 2 weeks
      break;
    case 'CASUAL':
      requiredNotice = 1; // 1 day
      break;
  }

  return {
    isValid: noticePeriod >= requiredNotice,
    requiredNotice,
    shortfall: Math.max(0, requiredNotice - noticePeriod),
  };
};