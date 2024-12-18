import { TaxCode } from '../../types/payroll';

// Student loan repayment rate and threshold for 2024
const STUDENT_LOAN_RATE = 0.12; // 12%
const STUDENT_LOAN_THRESHOLD = 22_828; // Annual repayment threshold

// Calculate student loan repayment
export const calculateStudentLoanRepayment = (
  annualIncome: number,
  hasStudentLoan: boolean = false,
  taxCode: TaxCode
): number => {
  if (!hasStudentLoan || !['M', 'ME', 'SL', 'SH', 'ST'].includes(taxCode)) {
    return 0;
  }

  if (annualIncome <= STUDENT_LOAN_THRESHOLD) {
    return 0;
  }

  return (annualIncome - STUDENT_LOAN_THRESHOLD) * STUDENT_LOAN_RATE;
};

// Calculate pay period student loan repayment
export const calculatePayPeriodStudentLoan = (
  annualRepayment: number,
  payPeriod: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY'
): number => {
  switch (payPeriod) {
    case 'WEEKLY':
      return annualRepayment / 52;
    case 'FORTNIGHTLY':
      return annualRepayment / 26;
    case 'MONTHLY':
      return annualRepayment / 12;
    default:
      return annualRepayment;
  }
};

// Calculate total deductions including tax, student loan, and KiwiSaver
export const calculateTotalDeductions = (
  annualIncome: number,
  taxCode: TaxCode,
  hasStudentLoan: boolean,
  kiwiSaverRate: number,
  otherDeductions: { amount: number }[]
): number => {
  const studentLoan = calculateStudentLoanRepayment(annualIncome, hasStudentLoan, taxCode);
  const kiwiSaver = annualIncome * kiwiSaverRate;
  const otherTotal = otherDeductions.reduce((sum, d) => sum + d.amount, 0);

  return studentLoan + kiwiSaver + otherTotal;
};