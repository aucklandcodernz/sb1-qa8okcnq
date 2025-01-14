import { PayrollItem, TaxCode } from '../../types/payroll';

// NZ PAYE Tax Rates 2024
const TAX_BRACKETS = [
  { min: 0, max: 14000, rate: 0.105 },      // 10.5%
  { min: 14001, max: 48000, rate: 0.175 },  // 17.5%
  { min: 48001, max: 70000, rate: 0.30 },   // 30%
  { min: 70001, max: 180000, rate: 0.33 },  // 33%
  { min: 180001, max: Infinity, rate: 0.39 }, // 39%
];

// ACC Levy rate for 2024
//const ACC_LEVY_RATE = 0.0139; // 1.39%  Removed duplicate declaration
const ACC_LEVY_MAX = 130911; // Maximum earnings for ACC levy

// KiwiSaver rates
const KIWISAVER_RATES = {
  EMPLOYEE_MIN: 0.03, // 3%
  EMPLOYER_MIN: 0.03, // 3%
};

export function calculatePayrollItem(
  employeeId: string,
  periodStart: string,
  periodEnd: string,
  basicSalary: number,
  taxCode: TaxCode,
  allowances: PayrollItem['allowances'],
  deductions: PayrollItem['deductions'],
  overtime: PayrollItem['overtime'],
  kiwiSaverRate: number
): PayrollItem {
  // Calculate taxable income
  const taxableAllowances = allowances
    .filter(a => a.taxable)
    .reduce((sum, a) => sum + a.amount, 0);
  
  const taxableIncome = basicSalary + taxableAllowances + overtime.amount;

  // Calculate PAYE tax
  let totalTax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;
    
    const taxableAmount = Math.min(
      remainingIncome,
      bracket.max - bracket.min + 1
    );
    
    totalTax += taxableAmount * bracket.rate;
    remainingIncome -= taxableAmount;
  }

  // Calculate ACC Levy
  const accEarnings = Math.min(taxableIncome, ACC_LEVY_MAX);
  const accLevy = accEarnings * ACC_LEVY_RATE; // Assuming ACC_LEVY_RATE is imported from acc/constants.ts

  // Calculate KiwiSaver
  const kiwiSaverEmployee = taxableIncome * kiwiSaverRate;
  const kiwiSaverEmployer = taxableIncome * KIWISAVER_RATES.EMPLOYER_MIN;

  // Calculate total deductions
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  // Calculate net salary
  const netSalary = taxableIncome - totalTax - accLevy - kiwiSaverEmployee - totalDeductions;

  return {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    periodStart,
    periodEnd,
    basicSalary,
    allowances,
    deductions,
    overtime,
    taxCode,
    taxableIncome,
    taxDeductions: [
      { type: 'PAYE', amount: totalTax, rate: totalTax / taxableIncome },
      { type: 'ACC', amount: accLevy, rate: ACC_LEVY_RATE }, // Assuming ACC_LEVY_RATE is imported from acc/constants.ts
    ],
    kiwiSaver: {
      employeeContribution: kiwiSaverEmployee,
      employerContribution: kiwiSaverEmployer,
      rate: kiwiSaverRate,
    },
    netSalary,
    status: 'DRAFT',
    paymentMethod: 'BANK_TRANSFER',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
interface PayrollCalculation {
  grossPay: number;
  netPay: number;
  payeTax: number;
  kiwiSaver: number;
  accLevy: number;
  hoursWorked: number;
  deductions: Record<string, number>;
  allowances: Record<string, number>;
}

const PAYE_RATES = {
  UNDER_14000: 0.105,
  UNDER_48000: 0.175,
  UNDER_70000: 0.30,
  UNDER_180000: 0.33,
  OVER_180000: 0.39
};

//const ACC_LEVY_RATE = 0.0139; // Removed duplicate declaration

export async function calculatePayrollForEmployee({ 
  employee, 
  startDate, 
  endDate 
}: {
  employee: any;
  startDate: Date;
  endDate: Date;
}): Promise<PayrollCalculation> {
  const hoursWorked = calculateHoursWorked(employee.attendance);
  const grossPay = employee.payrollDetails.baseSalary / 26; // Assuming fortnightly pay
  
  // Calculate PAYE tax
  const payeTax = calculatePayeTax(grossPay * 26) / 26;
  
  // Calculate KiwiSaver
  const kiwiSaver = grossPay * (employee.payrollDetails.kiwiSaverRate / 100);
  
  // Calculate ACC Levy
  const accLevy = grossPay * ACC_LEVY_RATE; // Assuming ACC_LEVY_RATE is imported from acc/constants.ts
  
  // Calculate net pay
  const netPay = grossPay - payeTax - kiwiSaver - accLevy;
  
  return {
    grossPay,
    netPay,
    payeTax,
    kiwiSaver,
    accLevy,
    hoursWorked,
    deductions: {},
    allowances: {}
  };
}

function calculateHoursWorked(attendance: any[]): number {
  return attendance.reduce((total, record) => {
    if (record.clockIn && record.clockOut) {
      const hours = (record.clockOut.getTime() - record.clockIn.getTime()) / (1000 * 60 * 60);
      return total + hours;
    }
    return total;
  }, 0);
}

function calculatePayeTax(annualIncome: number): number {
  if (annualIncome <= 14000) {
    return annualIncome * PAYE_RATES.UNDER_14000;
  } else if (annualIncome <= 48000) {
    return 14000 * PAYE_RATES.UNDER_14000 + 
           (annualIncome - 14000) * PAYE_RATES.UNDER_48000;
  }
  // Add more tax brackets as needed
  return annualIncome * PAYE_RATES.UNDER_48000; // Simplified for example
}