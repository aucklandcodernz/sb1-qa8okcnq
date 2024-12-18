import { TaxBracket, TaxCode, TaxDeduction } from '../../types/payroll';

// 2024 NZ Tax Brackets
export const taxBrackets: TaxBracket[] = [
  { min: 0, max: 14000, rate: 0.105 },      // 10.5%
  { min: 14001, max: 48000, rate: 0.175 },  // 17.5%
  { min: 48001, max: 70000, rate: 0.30 },   // 30%
  { min: 70001, max: 180000, rate: 0.33 },  // 33%
  { min: 180001, rate: 0.39 },              // 39%
];

// ACC Levy rate for 2024
const ACC_LEVY_RATE = 0.0139; // 1.39%
const ACC_LEVY_MAX = 130911; // Maximum earnings for ACC levy

// Student Loan repayment rate and threshold
const STUDENT_LOAN_RATE = 0.12; // 12%
const STUDENT_LOAN_THRESHOLD = 20280; // Annual repayment threshold

// KiwiSaver rates
export const KIWISAVER_RATES = {
  EMPLOYEE_MIN: 0.03, // 3%
  EMPLOYEE_MAX: 0.10, // 10%
  EMPLOYER_MIN: 0.03, // 3%
  EMPLOYER_MAX: 0.10, // 10%
  COMPULSORY_EMPLOYER: true,
};

// Calculate PAYE (Pay As You Earn) tax
export const calculatePAYE = (annualIncome: number): number => {
  let tax = 0;
  let remainingIncome = annualIncome;

  for (const bracket of taxBrackets) {
    if (remainingIncome <= 0) break;

    const taxableAmount = bracket.max 
      ? Math.min(remainingIncome, bracket.max - bracket.min)
      : remainingIncome;

    tax += taxableAmount * bracket.rate;
    remainingIncome -= taxableAmount;
  }

  return tax;
};

// Calculate all tax deductions including PAYE, ACC, Student Loan, and KiwiSaver
export const calculateTaxDeductions = (
  annualSalary: number,
  taxCode: TaxCode,
  hasStudentLoan: boolean = false,
  kiwiSaverRate: number = KIWISAVER_RATES.EMPLOYEE_MIN
): TaxDeduction[] => {
  const deductions: TaxDeduction[] = [];

  // Calculate PAYE
  const paye = calculatePAYE(annualSalary);
  deductions.push({
    type: 'PAYE',
    amount: paye,
    rate: paye / annualSalary,
  });

  // Calculate ACC Levy (capped at maximum earnings)
  const accEarnings = Math.min(annualSalary, ACC_LEVY_MAX);
  const accLevy = accEarnings * ACC_LEVY_RATE;
  deductions.push({
    type: 'ACC',
    amount: accLevy,
    rate: ACC_LEVY_RATE,
  });

  // Calculate Student Loan if applicable
  if (hasStudentLoan && ['MSL', 'MESLC', 'ST', 'SA'].includes(taxCode)) {
    const studentLoan = annualSalary > STUDENT_LOAN_THRESHOLD
      ? (annualSalary - STUDENT_LOAN_THRESHOLD) * STUDENT_LOAN_RATE
      : 0;
    
    if (studentLoan > 0) {
      deductions.push({
        type: 'STUDENT_LOAN',
        amount: studentLoan,
        rate: STUDENT_LOAN_RATE,
      });
    }
  }

  // Calculate KiwiSaver (ensure rate is within bounds)
  const validKiwiSaverRate = Math.min(
    Math.max(kiwiSaverRate, KIWISAVER_RATES.EMPLOYEE_MIN),
    KIWISAVER_RATES.EMPLOYEE_MAX
  );
  const kiwiSaver = annualSalary * validKiwiSaverRate;
  deductions.push({
    type: 'KIWISAVER',
    amount: kiwiSaver,
    rate: validKiwiSaverRate,
  });

  return deductions;
};

// Calculate net pay after all deductions
export const calculateNetPay = (
  grossPay: number,
  taxDeductions: TaxDeduction[]
): number => {
  const totalDeductions = taxDeductions.reduce((sum, deduction) => sum + deduction.amount, 0);
  return grossPay - totalDeductions;
};

// Calculate pay period amount based on frequency
export const calculatePayPeriodAmount = (
  annualAmount: number,
  payFrequency: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' = 'MONTHLY'
): number => {
  switch (payFrequency) {
    case 'WEEKLY':
      return annualAmount / 52;
    case 'FORTNIGHTLY':
      return annualAmount / 26;
    case 'MONTHLY':
      return annualAmount / 12;
    default:
      return annualAmount / 12;
  }
};

// Calculate annual leave entitlement (4 weeks minimum)
export const calculateAnnualLeave = (
  weeksPerYear: number = 4,
  hoursPerWeek: number = 40
): number => {
  return weeksPerYear * hoursPerWeek;
};

// Get taxable allowances
export const getTaxableAllowances = (
  allowances: { type: string; amount: number; taxable: boolean }[]
): number => {
  return allowances
    .filter(allowance => allowance.taxable)
    .reduce((sum, allowance) => sum + allowance.amount, 0);
};

// Validate tax code
export const validateTaxCode = (taxCode: string): taxCode is TaxCode => {
  const validTaxCodes: TaxCode[] = ['M', 'ME', 'MSL', 'MESLC', 'S', 'SH', 'ST', 'SA'];
  return validTaxCodes.includes(taxCode as TaxCode);
};

// Calculate employer KiwiSaver contribution
export const calculateEmployerKiwiSaver = (
  grossPay: number,
  rate: number = KIWISAVER_RATES.EMPLOYER_MIN
): number => {
  const validRate = Math.min(
    Math.max(rate, KIWISAVER_RATES.EMPLOYER_MIN),
    KIWISAVER_RATES.EMPLOYER_MAX
  );
  return grossPay * validRate;
};