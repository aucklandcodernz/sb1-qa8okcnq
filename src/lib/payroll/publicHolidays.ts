import { addDays, isWeekend, isWithinInterval } from 'date-fns';
import { PublicHoliday } from '../../types/payroll';

// 2024 NZ Public Holidays
export const PUBLIC_HOLIDAYS: PublicHoliday[] = [
  {
    date: '2024-01-01',
    name: "New Year's Day",
    type: 'NATIONAL',
  },
  {
    date: '2024-01-02',
    name: "Day after New Year's Day",
    type: 'NATIONAL',
  },
  {
    date: '2024-02-06',
    name: 'Waitangi Day',
    type: 'NATIONAL',
  },
  {
    date: '2024-03-29',
    name: 'Good Friday',
    type: 'NATIONAL',
  },
  {
    date: '2024-04-01',
    name: 'Easter Monday',
    type: 'NATIONAL',
  },
  {
    date: '2024-04-25',
    name: 'ANZAC Day',
    type: 'NATIONAL',
  },
  {
    date: '2024-06-03',
    name: "King's Birthday",
    type: 'NATIONAL',
  },
  {
    date: '2024-10-28',
    name: 'Labour Day',
    type: 'NATIONAL',
  },
  {
    date: '2024-12-25',
    name: 'Christmas Day',
    type: 'NATIONAL',
  },
  {
    date: '2024-12-26',
    name: 'Boxing Day',
    type: 'NATIONAL',
  },
];

// Holiday pay rates
export const HOLIDAY_PAY_RATES = {
  REGULAR: 1.0,
  TIME_AND_A_HALF: 1.5,
  DOUBLE_TIME: 2.0,
};

export const isPublicHoliday = (date: Date): boolean => {
  const dateString = date.toISOString().split('T')[0];
  return PUBLIC_HOLIDAYS.some(holiday => holiday.date === dateString);
};

export const getPublicHolidaysInRange = (
  startDate: Date,
  endDate: Date
): PublicHoliday[] => {
  return PUBLIC_HOLIDAYS.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= startDate && holidayDate <= endDate;
  });
};

export const calculateHolidayPay = (
  hourlyRate: number,
  hoursWorked: number,
  isPublicHoliday: boolean = false,
  includeAlternativeDay: boolean = false
): {
  amount: number;
  alternativeDay: boolean;
  breakdown: {
    baseRate: number;
    holidayRate: number;
    alternativeDayRate?: number;
  };
} => {
  if (!isPublicHoliday) {
    return {
      amount: hourlyRate * hoursWorked * HOLIDAY_PAY_RATES.REGULAR,
      alternativeDay: false,
      breakdown: {
        baseRate: hourlyRate,
        holidayRate: HOLIDAY_PAY_RATES.REGULAR,
      },
    };
  }

  const holidayPay = hourlyRate * hoursWorked * HOLIDAY_PAY_RATES.TIME_AND_A_HALF;
  
  return {
    amount: holidayPay,
    alternativeDay: includeAlternativeDay,
    breakdown: {
      baseRate: hourlyRate,
      holidayRate: HOLIDAY_PAY_RATES.TIME_AND_A_HALF,
      alternativeDayRate: includeAlternativeDay ? HOLIDAY_PAY_RATES.REGULAR : undefined,
    },
  };
};

export const calculateMondayisation = (holiday: PublicHoliday): Date => {
  const holidayDate = new Date(holiday.date);
  
  // If the holiday falls on a weekend
  if (isWeekend(holidayDate)) {
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

export const getNextPublicHoliday = (from: Date = new Date()): PublicHoliday | null => {
  const upcoming = PUBLIC_HOLIDAYS
    .filter(holiday => new Date(holiday.date) > from)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return upcoming[0] || null;
};

export const checkMissedPublicHolidays = (
  timeEntries: Array<{
    date: string;
    isWorking: boolean;
    publicHolidayPaid?: boolean;
  }>,
  startDate: Date,
  endDate: Date
): {
  missedHolidays: PublicHoliday[];
  unpaidHolidays: PublicHoliday[];
} => {
  const holidays = getPublicHolidaysInRange(startDate, endDate);
  const missedHolidays: PublicHoliday[] = [];
  const unpaidHolidays: PublicHoliday[] = [];

  holidays.forEach(holiday => {
    const entry = timeEntries.find(e => e.date === holiday.date);
    
    if (!entry) {
      missedHolidays.push(holiday);
    } else if (entry.isWorking && !entry.publicHolidayPaid) {
      unpaidHolidays.push(holiday);
    }
  });

  return {
    missedHolidays,
    unpaidHolidays,
  };
};