import { addDays, differenceInDays, isWeekend } from 'date-fns';

// NZ Public Holidays 2024
export const PUBLIC_HOLIDAYS = [
  { date: '2024-01-01', name: "New Year's Day", type: 'NATIONAL' },
  { date: '2024-01-02', name: "Day after New Year's Day", type: 'NATIONAL' },
  { date: '2024-02-06', name: 'Waitangi Day', type: 'NATIONAL' },
  { date: '2024-03-29', name: 'Good Friday', type: 'NATIONAL' },
  { date: '2024-04-01', name: 'Easter Monday', type: 'NATIONAL' },
  { date: '2024-04-25', name: 'ANZAC Day', type: 'NATIONAL' },
  { date: '2024-06-03', name: "King's Birthday", type: 'NATIONAL' },
  { date: '2024-10-28', name: 'Labour Day', type: 'NATIONAL' },
  { date: '2024-12-25', name: 'Christmas Day', type: 'NATIONAL' },
  { date: '2024-12-26', name: 'Boxing Day', type: 'NATIONAL' },
];

export interface HolidayPayCalculation {
  amount: number;
  alternativeDay: boolean;
  breakdown: {
    baseRate: number;
    holidayRate: number;
    alternativeDayRate?: number;
  };
}

export function calculateHolidayPay(
  hourlyRate: number,
  hoursWorked: number,
  isPublicHoliday: boolean = false,
  includeAlternativeDay: boolean = false
): HolidayPayCalculation {
  const baseRate = hourlyRate;
  const holidayRate = isPublicHoliday ? 1.5 : 1.0; // Time and a half for public holidays
  
  const amount = hourlyRate * hoursWorked * holidayRate;

  return {
    amount,
    alternativeDay: isPublicHoliday && includeAlternativeDay,
    breakdown: {
      baseRate,
      holidayRate,
      alternativeDayRate: includeAlternativeDay ? 1.0 : undefined,
    },
  };
}