import { ACC_RATES, INDUSTRY_RATES } from './constants';
import { PayPeriod } from '../../../types/payroll';

export interface AccLevyCalculation {
  workLevy: number;
  earnersLevy: number;
  workingSaferLevy: number;
  total: number;
  breakdown: {
    category: string;
    amount: number;
    rate: number;
    maxEarnings?: number;
  }[];
}

export const calculateAccLevies = (
  annualEarnings: number,
  industryCode: string,
  isEmployer: boolean = false
): AccLevyCalculation => {
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

  const total = workLevy + earnersLevy + workingSaferLevy;

  return {
    workLevy,
    earnersLevy,
    workingSaferLevy,
    total,
    breakdown: [
      {
        category: 'Work Levy',
        amount: workLevy,
        rate: INDUSTRY_RATES[industryCode]?.rate || ACC_RATES.WORK_LEVY.BASE_RATE,
        maxEarnings: ACC_RATES.WORK_LEVY.MAX_EARNINGS,
      },
      {
        category: "Earner's Levy",
        amount: earnersLevy,
        rate: ACC_RATES.EARNERS_LEVY.RATE,
        maxEarnings: ACC_RATES.EARNERS_LEVY.MAX_EARNINGS,
      },
      {
        category: 'Working Safer Levy',
        amount: workingSaferLevy,
        rate: ACC_RATES.WORKING_SAFER_LEVY.RATE,
      },
    ],
  };
};

export const calculatePayPeriodLevies = (
  annualEarnings: number,
  industryCode: string,
  payPeriod: PayPeriod,
  isEmployer: boolean = false
): AccLevyCalculation => {
  const annualLevies = calculateAccLevies(annualEarnings, industryCode, isEmployer);

  const divisor = payPeriod === 'WEEKLY' 
    ? 52 
    : payPeriod === 'FORTNIGHTLY' 
    ? 26 
    : payPeriod === 'MONTHLY'
    ? 12
    : 1;

  return {
    workLevy: annualLevies.workLevy / divisor,
    earnersLevy: annualLevies.earnersLevy / divisor,
    workingSaferLevy: annualLevies.workingSaferLevy / divisor,
    total: annualLevies.total / divisor,
    breakdown: annualLevies.breakdown.map(item => ({
      ...item,
      amount: item.amount / divisor,
    })),
  };
};

export const validateIndustryCode = (code: string): boolean => {
  return code in INDUSTRY_RATES;
};

export const getIndustryRate = (code: string): number => {
  return INDUSTRY_RATES[code]?.rate || ACC_RATES.WORK_LEVY.BASE_RATE;
};

export const getIndustryDescription = (code: string): string => {
  return INDUSTRY_RATES[code]?.description || 'Unknown Industry';
};