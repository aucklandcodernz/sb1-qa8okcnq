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
  // Add more industry classifications as needed
};

export const calculateAccLevies = (
  annualEarnings: number,
  industryCode: string,
  isEmployer: boolean = false
): {
  workLevy: number;
  earnersLevy: number;
  workingFaferLevy: number;
  total: number;
} => {
  // Cap earnings at maximum
  const cappedEarnings = Math.min(annualEarnings, ACC_RATES.WORK_LEVY.MAX_EARNINGS);

  // Calculate Work levy (paid by employer)
  const workLevy = isEmployer
    ? (cappedEarnings * (INDUSTRY_RATES[industryCode]?.rate || ACC_RATES.WORK_LEVY.BASE_RATE))
    : 0;

  // Calculate Earners' levy (paid by employee)
  const earnersLevy = !isEmployer
    ? (cappedEarnings * ACC_RATES.EARNERS_LEVY.RATE)
    : 0;

  // Calculate Working Safer levy (paid by employer)
  const workingSaferLevy = isEmployer
    ? (cappedEarnings * ACC_RATES.WORKING_SAFER_LEVY.RATE)
    : 0;

  return {
    workLevy,
    earnersLevy,
    workingFaferLevy: workingSaferLevy,
    total: workLevy + earnersLevy + workingSaferLevy,
  };
};

export const calculatePayPeriodLevies = (
  annualEarnings: number,
  industryCode: string,
  payPeriod: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY',
  isEmployer: boolean = false
): {
  workLevy: number;
  earnersLevy: number;
  workingFaferLevy: number;
  total: number;
} => {
  const annualLevies = calculateAccLevies(annualEarnings, industryCode, isEmployer);

  const divisor = payPeriod === 'WEEKLY' ? 52 : payPeriod === 'FORTNIGHTLY' ? 26 : 12;

  return {
    workLevy: annualLevies.workLevy / divisor,
    earnersLevy: annualLevies.earnersLevy / divisor,
    workingFaferLevy: annualLevies.workingFaferLevy / divisor,
    total: annualLevies.total / divisor,
  };
};

export const validateIndustryCode = (code: string): boolean => {
  return code in INDUSTRY_RATES;
};

export const getIndustryRate = (code: string): number => {
  return INDUSTRY_RATES[code]?.rate || ACC_RATES.WORK_LEVY.BASE_RATE;
};