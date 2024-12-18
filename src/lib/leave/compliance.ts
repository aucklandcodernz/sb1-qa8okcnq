import { addDays, differenceInDays, isWeekend } from 'date-fns';
import { LEAVE_ENTITLEMENTS, LEAVE_NOTICE_PERIODS, PUBLIC_HOLIDAYS_2024 } from './constants';
import { LeaveRequest } from '../../types/leave';

export interface LeaveComplianceCheck {
  isCompliant: boolean;
  issues: string[];
}

export const checkLeaveRequest = (
  request: LeaveRequest,
  employeeStartDate: Date,
  currentBalance: number
): LeaveComplianceCheck => {
  const issues: string[] = [];
  const today = new Date();
  const employmentLength = differenceInDays(today, employeeStartDate);

  // Check minimum employment period
  if (request.type === 'ANNUAL' && 
      employmentLength < LEAVE_ENTITLEMENTS.ANNUAL.MINIMUM_EMPLOYMENT_MONTHS * 30) {
    issues.push('Employee must be employed for 12 months before taking annual leave');
  }

  // Check notice period for annual leave
  if (request.type === 'ANNUAL') {
    const noticePeriod = differenceInDays(request.startDate, today);
    if (noticePeriod < LEAVE_NOTICE_PERIODS.ANNUAL.MINIMUM_DAYS) {
      issues.push(`Annual leave requests require ${LEAVE_NOTICE_PERIODS.ANNUAL.MINIMUM_DAYS} days notice`);
    }
  }

  // Check leave balance
  const requestedDays = differenceInDays(request.endDate, request.startDate) + 1;
  if (currentBalance < requestedDays) {
    issues.push('Insufficient leave balance');
  }

  // Check for public holidays
  const publicHolidayDays = PUBLIC_HOLIDAYS_2024.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= request.startDate && holidayDate <= request.endDate;
  });

  // Adjust requested days for public holidays and weekends
  let adjustedDays = requestedDays;
  let currentDate = new Date(request.startDate);
  while (currentDate <= request.endDate) {
    if (isWeekend(currentDate) || 
        publicHolidayDays.some(h => h.date === currentDate.toISOString().split('T')[0])) {
      adjustedDays--;
    }
    currentDate = addDays(currentDate, 1);
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  };
};

export const validateSickLeave = (
  request: LeaveRequest,
  consecutiveSickDays: number
): LeaveComplianceCheck => {
  const issues: string[] = [];

  // Check if medical certificate is required
  if (consecutiveSickDays > LEAVE_NOTICE_PERIODS.SICK.MEDICAL_CERTIFICATE.REQUIRED_AFTER_DAYS) {
    if (!request.documents?.some(d => d.type === 'MEDICAL_CERTIFICATE')) {
      issues.push('Medical certificate required for sick leave longer than 3 consecutive days');
    }
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  };
};

export const validateParentalLeave = (
  request: LeaveRequest,
  employmentLength: number,
  isPrimaryCarer: boolean
): LeaveComplianceCheck => {
  const issues: string[] = [];

  // Check minimum employment period
  if (employmentLength < LEAVE_ENTITLEMENTS.PARENTAL.MINIMUM_EMPLOYMENT_MONTHS) {
    issues.push('Employee must be employed for 6 months to be eligible for parental leave');
  }

  // Check notice period
  const noticePeriod = differenceInDays(request.startDate, new Date());
  if (noticePeriod < LEAVE_NOTICE_PERIODS.PARENTAL.MINIMUM_NOTICE_WEEKS * 7) {
    issues.push(`Parental leave requests require ${LEAVE_NOTICE_PERIODS.PARENTAL.MINIMUM_NOTICE_WEEKS} weeks notice`);
  }

  // Check duration
  const duration = differenceInDays(request.endDate, request.startDate) / 7; // in weeks
  const maxDuration = isPrimaryCarer 
    ? LEAVE_ENTITLEMENTS.PARENTAL.PRIMARY_CARER 
    : LEAVE_ENTITLEMENTS.PARENTAL.PARTNER;
  
  if (duration > maxDuration) {
    issues.push(`Maximum parental leave duration is ${maxDuration} weeks`);
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  };
};