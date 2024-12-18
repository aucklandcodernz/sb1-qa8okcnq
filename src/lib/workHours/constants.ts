export const BREAK_REQUIREMENTS = {
  REST_BREAK: {
    HOURS_THRESHOLD: 4,
    DURATION: 10, // minutes
    PAID: true,
  },
  MEAL_BREAK: {
    HOURS_THRESHOLD: 6,
    DURATION: 30, // minutes
    PAID: false,
  },
};

export const WORKING_HOUR_LIMITS = {
  DAILY: {
    STANDARD: 8,
    MAXIMUM: 12,
  },
  WEEKLY: {
    STANDARD: 40,
    MAXIMUM: 50,
    UNDER_18: 40,
  },
  REST_PERIOD: {
    BETWEEN_SHIFTS: 11, // hours
    WEEKLY_REST: 24, // hours
  },
};

export const OVERTIME_THRESHOLDS = {
  DAILY: 8, // hours
  WEEKLY: 40, // hours
};

export const YOUNG_WORKER_RESTRICTIONS = {
  MIN_AGE: 16,
  MAX_WEEKLY_HOURS: 40,
  MAX_DAILY_HOURS: 8,
  MIN_REST_PERIOD: 12, // hours between shifts
  PROHIBITED_WORK_TYPES: [
    'HAZARDOUS',
    'NIGHT_SHIFT',
    'HEAVY_MACHINERY',
  ],
};