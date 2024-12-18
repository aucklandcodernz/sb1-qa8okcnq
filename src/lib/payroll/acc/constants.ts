// ACC Levy rates and thresholds for 2024/25
export const ACC_RATES = {
  WORK_LEVY: {
    BASE_RATE: 0.0067, // $0.67 per $100 of liable earnings
    MAX_EARNINGS: 139_384, // Maximum earnings liable for ACC Work levy
  },
  EARNERS_LEVY: {
    RATE: 0.0139, // $1.39 per $100 of liable earnings
    MAX_EARNINGS: 139_384, // Maximum earnings liable for ACC Earners' levy
  },
  WORKING_SAFER_LEVY: {
    RATE: 0.08, // $0.08 per $100 of liable earnings
  },
};

// Industry classification and corresponding levy rates
export const INDUSTRY_RATES: Record<string, {
  description: string;
  rate: number;
  unit: string;
}> = {
  '17100': {
    description: 'Accommodation',
    rate: 0.0067,
    unit: 'per $100',
  },
  '78200': {
    description: 'Labour Supply Services',
    rate: 0.0067,
    unit: 'per $100',
  },
  '52520': {
    description: 'Construction Services',
    rate: 0.0171,
    unit: 'per $100',
  },
  '86130': {
    description: 'Information Technology Services',
    rate: 0.0048,
    unit: 'per $100',
  },
  '85310': {
    description: 'Medical Services',
    rate: 0.0089,
    unit: 'per $100',
  },
  '78100': {
    description: 'Scientific Research Services',
    rate: 0.0052,
    unit: 'per $100',
  },
  '92310': {
    description: 'Education and Training',
    rate: 0.0043,
    unit: 'per $100',
  },
  '69210': {
    description: 'Accounting Services',
    rate: 0.0038,
    unit: 'per $100',
  },
  '69110': {
    description: 'Legal Services',
    rate: 0.0041,
    unit: 'per $100',
  },
  '42100': {
    description: 'Retail Trade',
    rate: 0.0082,
    unit: 'per $100',
  },
};