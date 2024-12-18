import { addDays, differenceInDays, differenceInMonths } from 'date-fns';
import { LeaveBalance } from '../../types/leave';

// Constants for NZ leave entitlements
export const ANNUAL_LEAVE_WEEKS = 4; // 4 weeks per year minimum
export const SICK_LEAVE_DAYS = 10; // 10 days per year
export const BEREAVEMENT_LEAVE_DAYS = { IMMEDIATE: 3, EXTENDED: 1 };
export const PARENTAL_LEAVE_WEEKS = { PRIMARY: 26, PARTNER: 2 };

export interface LeaveAccrual {
  annual: number;
  sick: number;
  total: number;
}

export const calculateAnnualLeaveEntitlement = (
  startDate: Date,
  hoursPerWeek: number = 40
): number => {
  const now = new Date();
  const monthsEmployed = differenceInMonths(now, startDate);
  
  // After 12 months of continuous employment
  if (monthsEmployed >= 12) {
    return ANNUAL_LEAVE_WEEKS * hoursPerWeek;
  }
  
  // Pro-rata calculation for less than 12 months
  return Math.floor((monthsEmployed / 12) * ANNUAL_LEAVE_WEEKS * hoursPerWeek);
};

export const calculateSickLeaveEntitlement = (
  startDate: Date,
  currentBalance: number = 0
): number => {
  const now = new Date();
  const monthsEmployed = differenceInMonths(now, startDate);
  
  // After 6 months of continuous employment
  if (monthsEmployed >= 6) {
    return Math.min(currentBalance + SICK_LEAVE_DAYS, SICK_LEAVE_DAYS);
  }
  
  return 0;
};

export const calculateLeaveAccrual = (
  startDate: Date,
  hoursPerWeek: number = 40
): LeaveAccrual => {
  const annualLeave = calculateAnnualLeaveEntitlement(startDate, hoursPerWeek);
  const sickLeave = calculateSickLeaveEntitlement(startDate);
  
  return {
    annual: annualLeave,
    sick: sickLeave,
    total: annualLeave + (sickLeave * 8), // Convert sick days to hours
  };
};

export const checkLeaveCompliance = (
  employeeId: string,
  balance: LeaveBalance,
  startDate: Date
): {
  isCompliant: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  const accrual = calculateLeaveAccrual(startDate);
  
  // Check annual leave compliance
  if (balance.annual < accrual.annual) {
    issues.push(`Annual leave balance (${balance.annual} hours) is below the minimum entitlement (${accrual.annual} hours)`);
  }
  
  // Check sick leave compliance
  if (balance.sick < accrual.sick) {
    issues.push(`Sick leave balance (${balance.sick} days) is below the minimum entitlement (${accrual.sick} days)`);
  }
  
  return {
    isCompliant: issues.length === 0,
    issues,
  };
};

export const calculateParentalLeaveEntitlement = (
  startDate: Date,
  isPrimaryCaregiver: boolean = true,
  hasWorked6Months: boolean = false
): number => {
  const weeks = isPrimaryCaregiver ? PARENTAL_LEAVE_WEEKS.PRIMARY : PARENTAL_LEAVE_WEEKS.PARTNER;
  
  // Must have worked for at least 6 months
  if (!hasWorked6Months) return 0;
  
  return weeks * 5; // Convert weeks to working days
};

export const calculateBereavementLeaveEntitlement = (
  relationship: 'IMMEDIATE' | 'EXTENDED'
): number => {
  return relationship === 'IMMEDIATE'
    ? BEREAVEMENT_LEAVE_DAYS.IMMEDIATE
    : BEREAVEMENT_LEAVE_DAYS.EXTENDED;
};

export const getLeaveExpiryDate = (
  leaveDate: Date,
  carryOverMonths: number = 12
): Date => {
  return addDays(leaveDate, carryOverMonths * 30);
};

export const checkExpiringLeave = (
  balance: LeaveBalance,
  warningDays: number = 60
): {
  isExpiring: boolean;
  expiringDays: number;
  expiryDate: Date;
} => {
  const now = new Date();
  const expiryDate = getLeaveExpiryDate(now);
  const daysUntilExpiry = differenceInDays(expiryDate, now);
  
  return {
    isExpiring: daysUntilExpiry <= warningDays,
    expiringDays: daysUntilExpiry,
    expiryDate,
  };
};