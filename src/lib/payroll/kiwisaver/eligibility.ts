import { addDays, differenceInDays, differenceInMonths } from 'date-fns';
import { ELIGIBILITY, OPT_OUT } from './constants';
import { Employee } from '../../../types/employee';

export const checkKiwiSaverEligibility = (
  employee: Employee,
  startDate: Date
): {
  isEligible: boolean;
  automaticEnrollment: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  const now = new Date();
  const age = calculateAge(employee.dateOfBirth);
  const employmentLength = differenceInMonths(now, startDate);

  // Check age requirements
  if (age < ELIGIBILITY.MIN_AGE) {
    issues.push(`Employee must be at least ${ELIGIBILITY.MIN_AGE} years old`);
  }
  if (age >= ELIGIBILITY.MAX_AGE) {
    issues.push(`Employee is over ${ELIGIBILITY.MAX_AGE} years old`);
  }

  // Check citizenship/residency
  if (!ELIGIBILITY.CITIZENSHIP.includes(employee.residencyStatus)) {
    issues.push('Employee must be a NZ citizen, permanent resident, or hold a valid work visa');
  }

  // Check employment length for automatic enrollment
  const automaticEnrollment = employmentLength >= ELIGIBILITY.MIN_EMPLOYMENT_MONTHS;

  return {
    isEligible: issues.length === 0,
    automaticEnrollment,
    issues,
  };
};

export const isWithinOptOutWindow = (startDate: Date): boolean => {
  const now = new Date();
  const daysEmployed = differenceInDays(now, startDate);
  
  return daysEmployed >= OPT_OUT.WINDOW_START_DAYS && 
         daysEmployed <= OPT_OUT.WINDOW_END_DAYS;
};

export const getOptOutWindowDates = (startDate: Date): {
  windowStart: Date;
  windowEnd: Date;
} => {
  return {
    windowStart: addDays(startDate, OPT_OUT.WINDOW_START_DAYS),
    windowEnd: addDays(startDate, OPT_OUT.WINDOW_END_DAYS),
  };
};

export const canRequestSavingsSuspension = (
  membershipStartDate: Date
): {
  canRequest: boolean;
  reason?: string;
} => {
  const membershipLength = differenceInMonths(new Date(), membershipStartDate);
  
  if (membershipLength < SAVINGS_SUSPENSION.MIN_MEMBERSHIP_MONTHS) {
    return {
      canRequest: false,
      reason: `Must be a KiwiSaver member for at least ${SAVINGS_SUSPENSION.MIN_MEMBERSHIP_MONTHS} months`,
    };
  }

  return { canRequest: true };
};

const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  
  return age;
};