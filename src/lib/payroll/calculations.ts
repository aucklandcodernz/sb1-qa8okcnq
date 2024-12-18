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
const ACC_LEVY_RATE = 0.0139; // 1.39%
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
  const accLevy = accEarnings * ACC_LEVY_RATE;

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
      { type: 'ACC', amount: accLevy, rate: ACC_LEVY_RATE },
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