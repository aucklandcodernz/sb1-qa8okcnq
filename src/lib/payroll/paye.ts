// 2024 NZ Tax Brackets
export const TAX_BRACKETS = [
  { min: 0, max: 14000, rate: 0.105 },      // 10.5%
  { min: 14001, max: 48000, rate: 0.175 },  // 17.5%
  { min: 48001, max: 70000, rate: 0.30 },   // 30%
  { min: 70001, max: 180000, rate: 0.33 },  // 33%
  { min: 180001, max: Infinity, rate: 0.39 }, // 39%
];

export const calculatePAYE = (annualIncome: number): {
  totalTax: number;
  effectiveRate: number;
  brackets: {
    amount: number;
    tax: number;
    rate: number;
  }[];
} => {
  let totalTax = 0;
  const brackets = [];
  let remainingIncome = annualIncome;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const taxableAmount = Math.min(
      remainingIncome,
      bracket.max - (bracket.min - 1)
    );

    const taxForBracket = taxableAmount * bracket.rate;
    totalTax += taxForBracket;

    brackets.push({
      amount: taxableAmount,
      tax: taxForBracket,
      rate: bracket.rate,
    });

    remainingIncome -= taxableAmount;
  }

  return {
    totalTax,
    effectiveRate: totalTax / annualIncome,
    brackets,
  };
};

export const calculatePayPeriodTax = (
  annualIncome: number,
  payPeriod: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY'
): number => {
  const { totalTax } = calculatePAYE(annualIncome);
  
  switch (payPeriod) {
    case 'WEEKLY':
      return totalTax / 52;
    case 'FORTNIGHTLY':
      return totalTax / 26;
    case 'MONTHLY':
      return totalTax / 12;
    default:
      return totalTax / 12;
  }
};

export const calculateStudentLoanDeduction = (
  annualIncome: number,
  hasStudentLoan: boolean = false,
  threshold: number = 21_268 // 2024 threshold
): number => {
  if (!hasStudentLoan || annualIncome <= threshold) {
    return 0;
  }

  const taxableAmount = annualIncome - threshold;
  return taxableAmount * 0.12; // 12% student loan repayment rate
};

export const calculateAnnualizedPay = (
  amount: number,
  frequency: 'HOURLY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY',
  hoursPerWeek: number = 40
): number => {
  switch (frequency) {
    case 'HOURLY':
      return amount * hoursPerWeek * 52;
    case 'WEEKLY':
      return amount * 52;
    case 'FORTNIGHTLY':
      return amount * 26;
    case 'MONTHLY':
      return amount * 12;
    case 'ANNUALLY':
      return amount;
    default:
      return amount;
  }
};