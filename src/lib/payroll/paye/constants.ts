// 2024 NZ Tax Brackets
export const TAX_BRACKETS = [
  { min: 0, max: 14000, rate: 0.105 },      // 10.5%
  { min: 14001, max: 48000, rate: 0.175 },  // 17.5%
  { min: 48001, max: 70000, rate: 0.30 },   // 30%
  { min: 70001, max: 180000, rate: 0.33 },  // 33%
  { min: 180001, max: Infinity, rate: 0.39 }, // 39%
];

// Tax codes and their descriptions
export const TAX_CODES = {
  M: 'Primary employment',
  ME: 'Primary employment with student loan exemption',
  SB: 'Secondary employment',
  S: 'Secondary employment',
  SH: 'Secondary employment with higher tax rate',
  ST: 'Secondary employment with student loan',
  SA: 'Secondary employment with student loan and higher tax rate',
  CAE: 'Casual employment',
  EDW: 'Election day worker',
  NSW: 'Non-resident seasonal worker',
  STC: 'Special tax code',
} as const;

// Student loan thresholds and rates
export const STUDENT_LOAN = {
  REPAYMENT_RATE: 0.12, // 12%
  THRESHOLD: 22828, // Annual repayment threshold for 2024
  PAY_PERIOD_THRESHOLD: {
    WEEKLY: 439,
    FORTNIGHTLY: 878,
    MONTHLY: 1902,
    ANNUALLY: 22828,
  },
};

// ACC Earner's levy
export const ACC_EARNER_LEVY = {
  RATE: 0.0139, // 1.39%
  MAX_EARNINGS: 139384, // Maximum earnings for ACC levy
};