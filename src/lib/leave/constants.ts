export const LEAVE_ENTITLEMENTS = {
  ANNUAL: {
    WEEKS_PER_YEAR: 4,
    MINIMUM_EMPLOYMENT_MONTHS: 12,
  },
  SICK: {
    DAYS_PER_YEAR: 10,
    MINIMUM_EMPLOYMENT_MONTHS: 6,
  },
  BEREAVEMENT: {
    IMMEDIATE_FAMILY: 3, // days
    OTHER: 1, // day
  },
  PARENTAL: {
    PRIMARY_CARER: 26, // weeks
    PARTNER: 2, // weeks
    EXTENDED: 52, // weeks
    MINIMUM_EMPLOYMENT_MONTHS: 6,
  },
  PUBLIC_HOLIDAYS: {
    ALTERNATIVE_HOLIDAY: true,
    TRANSFER_ALLOWED: true,
    TIME_AND_A_HALF: true,
  },
};

export const LEAVE_ACCRUAL = {
  ANNUAL: {
    ACCRUAL_RATE: 0.0769, // 4 weeks / 52 weeks
    PRO_RATA_ALLOWED: true,
  },
  SICK: {
    ACCRUAL_RATE: 0.1923, // 10 days / 52 weeks
    CARRY_OVER: true,
  },
};

export const LEAVE_NOTICE_PERIODS = {
  ANNUAL: {
    MINIMUM_DAYS: 14,
    NEGOTIABLE: true,
  },
  SICK: {
    NOTIFICATION_REQUIRED: 'AS_SOON_AS_POSSIBLE',
    MEDICAL_CERTIFICATE: {
      REQUIRED_AFTER_DAYS: 3,
      EMPLOYER_CAN_REQUEST: true,
    },
  },
  PARENTAL: {
    MINIMUM_NOTICE_WEEKS: 3,
    EARLY_NOTICE_BONUS_WEEKS: 13,
  },
};

export const PUBLIC_HOLIDAYS_2024 = [
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