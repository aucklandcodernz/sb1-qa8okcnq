import { KiwiSaverRate } from '../../../types/payroll';

// KiwiSaver contribution rates as per NZ legislation
export const KIWISAVER_RATES: KiwiSaverRate = {
  EMPLOYEE: {
    MIN: 0.03, // 3%
    MAX: 0.10, // 10%
    DEFAULT: 0.03,
    OPTIONS: [0.03, 0.04, 0.06, 0.08, 0.10],
  },
  EMPLOYER: {
    MIN: 0.03, // 3% minimum employer contribution
    COMPULSORY: true,
  },
};

// Eligibility criteria
export const ELIGIBILITY = {
  MIN_AGE: 18,
  MAX_AGE: 65,
  CITIZENSHIP: ['NZ_CITIZEN', 'PERMANENT_RESIDENT', 'WORK_VISA'],
  MIN_EMPLOYMENT_MONTHS: 1, // Auto-enrollment after 1 month
};

// Contribution holiday (savings suspension) limits
export const SAVINGS_SUSPENSION = {
  MIN_DURATION_MONTHS: 3,
  MAX_DURATION_MONTHS: 12,
  MIN_MEMBERSHIP_MONTHS: 12, // Must be member for 12 months before suspension
};

// Opt-out window
export const OPT_OUT = {
  WINDOW_START_DAYS: 14, // Can opt-out between 14...
  WINDOW_END_DAYS: 56,   // ...and 56 days after starting new employment
};