import { addDays, differenceInDays, isWeekend } from 'date-fns';
import { PayPeriod, TaxCode } from '../../../types/payroll';

// NZ Tax Brackets for 2024
const TAX_BRACKETS = [
  { min: 0, max: 14000, rate: 0.105 },      // 10.5%
  { min: 14001, max: 48000, rate: 0.175 },  // 17.5%
  { min: 48001, max: 70000, rate: 0.30 },   // 30%
  { min: 70001, max: 180000, rate: 0.33 },  // 33%
  { min: 180001, max: Infinity, rate: 0.39 }, // 39%
];

// ACC Earner Levy for 2024
const ACC_EARNER_LEVY = {
  RATE: 0.0139,           // 1.39%
  MAX_EARNINGS: 139384,   // Maximum earnings cap
};

// KiwiSaver rates
const KIWISAVER = {
  EMPLOYEE_MIN: 0.03,     // 3%
  EMPLOYEE_MAX: 0.10,     // 10%
  EMPLOYER_MIN: 0.03,     // 3%
};

export interface PayrollCalculation {
  grossPay: number;
  taxableIncome: number;
  paye: number;
  acc: number;
  kiwiSaver: {
    employee: number;
    employer: number;
  };
  studentLoan?: number;
  netPay: number;
  breakdown: {
    category: string;
    amount: number;
    rate: number;
    details?: string;
  }[];
}

export function calculatePayroll(
  salary: number,
  payPeriod: PayPeriod,
  taxCode: TaxCode,
  kiwiSaverRate: number = KIWISAVER.EMPLOYEE_MIN,
  hasStudentLoan: boolean = false,
  extraDeductions: { amount: number; description: string }[] = []
): PayrollCalculation {
  // Convert to annual salary if needed
  const annualSalary = convertToAnnualSalary(salary, payPeriod);
  
  // Calculate PAYE tax
  const paye = calculatePAYE(annualSalary);
  
  // Calculate ACC
  const accEarnings = Math.min(annualSalary, ACC_EARNER_LEVY.MAX_EARNINGS);
  const acc = accEarnings * ACC_EARNER_LEVY.RATE;
  
  // Calculate KiwiSaver
  const validKiwiSaverRate = Math.min(Math.max(kiwiSaverRate, KIWISAVER.EMPLOYEE_MIN), KIWISAVER.EMPLOYEE_MAX);
  const kiwiSaverEmployee = annualSalary * validKiwiSaverRate;
  const kiwiSaverEmployer = annualSalary * KIWISAVER.EMPLOYER_MIN;
  
  // Calculate student loan if applicable
  const studentLoan = hasStudentLoan ? calculateStudentLoan(annualSalary) : 0;
  
  // Calculate total deductions
  const totalDeductions = paye + acc + kiwiSaverEmployee + studentLoan + 
    extraDeductions.reduce((sum, d) => sum + d.amount, 0);
  
  // Convert back to pay period amounts
  const periodMultiplier = getPayPeriodMultiplier(payPeriod);
  
  const calculation: PayrollCalculation = {
    grossPay: salary,
    taxableIncome: salary,
    paye: paye / periodMultiplier,
    acc: acc / periodMultiplier,
    kiwiSaver: {
      employee: kiwiSaverEmployee / periodMultiplier,
      employer: kiwiSaverEmployer / periodMultiplier,
    },
    studentLoan: studentLoan / periodMultiplier,
    netPay: salary - (totalDeductions / periodMultiplier),
    breakdown: [
      {
        category: 'PAYE Tax',
        amount: paye / periodMultiplier,
        rate: paye / annualSalary,
      },
      {
        category: 'ACC Levy',
        amount: acc / periodMultiplier,
        rate: ACC_EARNER_LEVY.RATE,
      },
      {
        category: 'KiwiSaver (Employee)',
        amount: kiwiSaverEmployee / periodMultiplier,
        rate: validKiwiSaverRate,
      },
      {
        category: 'KiwiSaver (Employer)',
        amount: kiwiSaverEmployer / periodMultiplier,
        rate: KIWISAVER.EMPLOYER_MIN,
      },
    ],
  };

  if (hasStudentLoan) {
    calculation.breakdown.push({
      category: 'Student Loan',
      amount: studentLoan / periodMultiplier,
      rate: 0.12, // 12% student loan repayment rate
    });
  }

  return calculation;
}

function calculatePAYE(annualIncome: number): number {
  let tax = 0;
  let remainingIncome = annualIncome;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;
    
    const taxableAmount = Math.min(
      remainingIncome,
      bracket.max - (bracket.min - 1)
    );
    
    tax += taxableAmount * bracket.rate;
    remainingIncome -= taxableAmount;
  }

  return tax;
}

function calculateStudentLoan(annualIncome: number): number {
  const threshold = 22828; // 2024 threshold
  if (annualIncome <= threshold) return 0;
  return (annualIncome - threshold) * 0.12; // 12% repayment rate
}

function convertToAnnualSalary(amount: number, period: PayPeriod): number {
  switch (period) {
    case 'WEEKLY':
      return amount * 52;
    case 'FORTNIGHTLY':
      return amount * 26;
    case 'MONTHLY':
      return amount * 12;
    case 'ANNUALLY':
      return amount;
  }
}

function getPayPeriodMultiplier(period: PayPeriod): number {
  switch (period) {
    case 'WEEKLY':
      return 52;
    case 'FORTNIGHTLY':
      return 26;
    case 'MONTHLY':
      return 12;
    case 'ANNUALLY':
      return 1;
  }
}