import { TAX_BRACKETS, STUDENT_LOAN, ACC_EARNER_LEVY } from './constants';
import { PayPeriod, TaxCalculation, TaxCode } from '../../../types/payroll';

export const calculatePAYE = (annualIncome: number): TaxCalculation => {
  let totalTax = 0;
  const brackets = [];
  let remainingIncome = annualIncome;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const taxableAmount = Math.min(
      remainingIncome,
      bracket.max - bracket.min + 1
    );

    const taxForBracket = taxableAmount * bracket.rate;
    totalTax += taxForBracket;

    brackets.push({
      amount: taxableAmount,
      rate: bracket.rate,
      tax: taxForBracket,
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
  payPeriod: PayPeriod
): number => {
  const { totalTax } = calculatePAYE(annualIncome);
  
  switch (payPeriod) {
    case 'WEEKLY':
      return totalTax / 52;
    case 'FORTNIGHTLY':
      return totalTax / 26;
    case 'MONTHLY':
      return totalTax / 12;
    case 'ANNUALLY':
      return totalTax;
    default:
      return totalTax;
  }
};

export const calculateStudentLoanRepayment = (
  income: number,
  payPeriod: PayPeriod,
  hasStudentLoan: boolean = false
): number => {
  if (!hasStudentLoan) return 0;

  const threshold = STUDENT_LOAN.PAY_PERIOD_THRESHOLD[payPeriod];
  if (income <= threshold) return 0;

  return (income - threshold) * STUDENT_LOAN.REPAYMENT_RATE;
};

export const calculateACCEarnerLevy = (
  income: number,
  payPeriod: PayPeriod
): number => {
  // Convert pay period income to annual for cap check
  const annualizedIncome = convertToAnnualIncome(income, payPeriod);
  const cappedIncome = Math.min(annualizedIncome, ACC_EARNER_LEVY.MAX_EARNINGS);
  
  // Calculate annual levy and convert back to pay period
  const annualLevy = cappedIncome * ACC_EARNER_LEVY.RATE;
  return convertFromAnnualAmount(annualLevy, payPeriod);
};

export const calculateTakeHomePay = (
  income: number,
  payPeriod: PayPeriod,
  taxCode: TaxCode,
  hasStudentLoan: boolean = false,
  kiwiSaverRate: number = 0.03
): {
  grossIncome: number;
  paye: number;
  acc: number;
  studentLoan: number;
  kiwiSaver: number;
  netIncome: number;
} => {
  const paye = calculatePayPeriodTax(convertToAnnualIncome(income, payPeriod), payPeriod);
  const acc = calculateACCEarnerLevy(income, payPeriod);
  const studentLoan = calculateStudentLoanRepayment(income, payPeriod, hasStudentLoan);
  const kiwiSaver = income * kiwiSaverRate;

  return {
    grossIncome: income,
    paye,
    acc,
    studentLoan,
    kiwiSaver,
    netIncome: income - paye - acc - studentLoan - kiwiSaver,
  };
};

// Helper functions
const convertToAnnualIncome = (income: number, payPeriod: PayPeriod): number => {
  switch (payPeriod) {
    case 'WEEKLY':
      return income * 52;
    case 'FORTNIGHTLY':
      return income * 26;
    case 'MONTHLY':
      return income * 12;
    case 'ANNUALLY':
      return income;
    default:
      return income;
  }
};

const convertFromAnnualAmount = (amount: number, payPeriod: PayPeriod): number => {
  switch (payPeriod) {
    case 'WEEKLY':
      return amount / 52;
    case 'FORTNIGHTLY':
      return amount / 26;
    case 'MONTHLY':
      return amount / 12;
    case 'ANNUALLY':
      return amount;
    default:
      return amount;
  }
};