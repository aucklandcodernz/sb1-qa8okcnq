export interface PublicHoliday {
  date: string;
  name: string;
  type: 'NATIONAL' | 'REGIONAL';
  region?: string;
}

// 2024 NZ Public Holidays
export const publicHolidays: PublicHoliday[] = [
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

export const isPublicHoliday = (date: Date): boolean => {
  const dateString = date.toISOString().split('T')[0];
  return publicHolidays.some(holiday => holiday.date === dateString);
};

export const getPublicHolidaysInRange = (startDate: Date, endDate: Date): PublicHoliday[] => {
  return publicHolidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= startDate && holidayDate <= endDate;
  });
};

export const getNextPublicHoliday = (from: Date = new Date()): PublicHoliday | null => {
  const upcoming = publicHolidays
    .filter(holiday => new Date(holiday.date) > from)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return upcoming[0] || null;
};