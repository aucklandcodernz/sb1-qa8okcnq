// NZ Public Holiday rates and rules
export const HOLIDAY_PAY_RATES = {
  REGULAR: 1.0,      // Regular pay rate
  TIME_AND_A_HALF: 1.5,  // Working on a public holiday
  DOUBLE_TIME: 2.0,  // Special cases
};

// Alternative holiday (day in lieu) rules
export const ALTERNATIVE_HOLIDAY = {
  ELIGIBLE_IF_WORKING: true,  // Get alternative day if working on public holiday
  ELIGIBLE_IF_NORMALLY_WORKING: true, // Get alternative day if it falls on normal work day
  EXPIRY_MONTHS: 12,  // Alternative holidays expire after 12 months
};

// Minimum daily pay rates
export const MINIMUM_DAILY_PAY = {
  RELEVANT_DAILY_PAY: true,  // Use relevant daily pay if possible
  AVERAGE_DAILY_PAY: true,   // Use average daily pay as fallback
  CALCULATION_WEEKS: 52,     // Calculate average over 52 weeks
};

// 2024 NZ Public Holidays
export const PUBLIC_HOLIDAYS_2024 = [
  { date: '2024-01-01', name: "New Year's Day", type: 'NATIONAL' as const },
  { date: '2024-01-02', name: "Day after New Year's Day", type: 'NATIONAL' as const },
  { date: '2024-02-06', name: 'Waitangi Day', type: 'NATIONAL' as const },
  { date: '2024-03-29', name: 'Good Friday', type: 'NATIONAL' as const },
  { date: '2024-04-01', name: 'Easter Monday', type: 'NATIONAL' as const },
  { date: '2024-04-25', name: 'ANZAC Day', type: 'NATIONAL' as const },
  { date: '2024-06-03', name: "King's Birthday", type: 'NATIONAL' as const },
  { date: '2024-10-28', name: 'Labour Day', type: 'NATIONAL' as const },
  { date: '2024-12-25', name: 'Christmas Day', type: 'NATIONAL' as const },
  { date: '2024-12-26', name: 'Boxing Day', type: 'NATIONAL' as const },
];

// Regional anniversary days - dates vary by region
export const REGIONAL_HOLIDAYS = {
  AUCKLAND: { date: '2024-01-29', name: 'Auckland Anniversary Day' },
  WELLINGTON: { date: '2024-01-22', name: 'Wellington Anniversary Day' },
  CANTERBURY: { date: '2024-11-15', name: 'Canterbury Anniversary Day' },
  // Add other regions as needed
};

// Mondayisation rules
export const MONDAYISATION_RULES = {
  ELIGIBLE_HOLIDAYS: [
    "New Year's Day",
    "Day after New Year's Day",
    'Waitangi Day',
    'ANZAC Day',
    'Christmas Day',
    'Boxing Day',
  ],
  APPLIES_TO_WEEKEND: true,
};