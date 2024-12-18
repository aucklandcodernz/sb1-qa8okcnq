import { addDays, differenceInDays, isWeekend, isWithinInterval } from 'date-fns';
import { publicHolidays } from './holidays';

export const calculateLeaveBalance = (
  annualEntitlement: number,
  leavesTaken: number,
  carryOver: number = 0
): number => {
  return annualEntitlement + carryOver - leavesTaken;
};

export const calculateLeaveAccrual = (
  startDate: Date,
  currentDate: Date = new Date(),
  annualEntitlement: number = 20
): number => {
  const daysEmployed = differenceInDays(currentDate, startDate);
  const accrualRate = annualEntitlement / 365;
  return Math.floor(daysEmployed * accrualRate);
};

export const calculateLeavePay = (
  dailyRate: number,
  days: number,
  includeHolidays: boolean = true
): number => {
  let totalDays = days;
  
  if (!includeHolidays) {
    const startDate = new Date();
    const endDate = addDays(startDate, days);
    
    // Subtract weekends
    totalDays -= Array.from({ length: days }).filter((_, index) => {
      const date = addDays(startDate, index);
      return isWeekend(date);
    }).length;

    // Subtract public holidays
    totalDays -= publicHolidays.filter(holiday => 
      isWithinInterval(new Date(holiday.date), { start: startDate, end: endDate })
    ).length;
  }

  return totalDays * dailyRate;
};

export const calculateSickLeaveEntitlement = (
  startDate: Date,
  currentDate: Date = new Date()
): number => {
  const daysEmployed = differenceInDays(currentDate, startDate);
  
  // After 6 months of continuous employment
  if (daysEmployed >= 180) {
    return 10; // 10 days per year
  }
  
  return 0;
};

export const calculateParentalLeave = (
  startDate: Date,
  isPrimaryCaregiver: boolean = true
): number => {
  const daysEmployed = differenceInDays(new Date(), startDate);
  
  // Must have worked for at least 6 months
  if (daysEmployed < 180) return 0;
  
  // Primary caregiver gets 26 weeks
  if (isPrimaryCaregiver) return 26 * 7;
  
  // Partners get 2 weeks
  return 2 * 7;
};

export const calculateBereavement = (relationship: 'IMMEDIATE' | 'EXTENDED'): number => {
  // 3 days for immediate family
  if (relationship === 'IMMEDIATE') return 3;
  
  // 1 day for extended family
  return 1;
};