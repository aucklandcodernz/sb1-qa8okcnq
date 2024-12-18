import { atom } from 'jotai';
import { 
  PayrollItem, 
  PayrollSummary, 
  PayrollSettings,
  PayrollReport,
  TaxDeduction 
} from '../types/payroll';
import { 
  calculateTaxDeductions, 
  calculateNetPay,
  getTaxableAllowances 
} from './tax';

export const payrollItemsAtom = atom<PayrollItem[]>([]);
export const payrollSummariesAtom = atom<PayrollSummary[]>([]);
export const payrollSettingsAtom = atom<PayrollSettings>({
  payFrequency: 'MONTHLY',
  payDay: 25,
  defaultPaymentMethod: 'BANK_TRANSFER',
  defaultKiwiSaverRate: 0.03,
  allowances: [
    { type: 'Housing', taxable: true, defaultAmount: 1000 },
    { type: 'Transport', taxable: true, defaultAmount: 500 },
    { type: 'Meal', taxable: false, defaultAmount: 200 },
  ],
  deductions: [
    { type: 'Health Insurance', defaultAmount: 200 },
    { type: 'Union Fees', defaultAmount: 50 },
  ],
  overtimeRates: [
    { type: 'Standard Overtime', multiplier: 1.5 },
    { type: 'Weekend', multiplier: 2.0 },
    { type: 'Public Holiday', multiplier: 2.5 },
  ],
});

export const calculatePayroll = (
  employeeId: string,
  periodStart: string,
  periodEnd: string,
  basicSalary: number,
  taxCode: string,
  allowances: PayrollItem['allowances'],
  deductions: PayrollItem['deductions'],
  overtime: PayrollItem['overtime'],
  kiwiSaverRate: number
): PayrollItem => {
  // Calculate taxable income
  const taxableAllowances = getTaxableAllowances(allowances);
  const taxableIncome = basicSalary + taxableAllowances + overtime.amount;

  // Calculate tax deductions
  const taxDeductions = calculateTaxDeductions(
    taxableIncome * 12, // Convert to annual for tax calculation
    taxCode as any,
    false, // hasStudentLoan - should come from employee profile
    kiwiSaverRate
  );

  // Calculate KiwiSaver
  const kiwiSaverEmployee = taxableIncome * kiwiSaverRate;
  const kiwiSaverEmployer = taxableIncome * 0.03; // Employer contribution

  // Calculate total deductions
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  // Calculate net salary
  const netSalary = calculateNetPay(taxableIncome, taxDeductions) - totalDeductions;

  return {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    periodStart,
    periodEnd,
    basicSalary,
    allowances,
    deductions,
    overtime,
    taxCode: taxCode as any,
    taxableIncome,
    taxDeductions,
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
};

export const processPayroll = async (payrollItem: PayrollItem): Promise<void> => {
  // In a real implementation, this would:
  // 1. Validate the payroll item
  // 2. Update employee records
  // 3. Generate payslip
  // 4. Process payment
  // 5. Update tax records
  // 6. Update KiwiSaver contributions
  // For now, we'll just update the status
  payrollItemsAtom.init = payrollItemsAtom.init.map(item =>
    item.id === payrollItem.id
      ? { ...item, status: 'PAID', paymentDate: new Date().toISOString() }
      : item
  );
};

export const generatePayrollReport = async (
  type: PayrollReport['type'],
  periodStart: string,
  periodEnd: string,
  format: PayrollReport['format'] = 'PDF'
): Promise<PayrollReport> => {
  // In a real implementation, this would generate actual reports
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    periodStart,
    periodEnd,
    generatedAt: new Date().toISOString(),
    format,
    url: `/reports/${type.toLowerCase()}-${periodStart}-${periodEnd}.${format.toLowerCase()}`,
  };
};

export const updatePayrollSettings = (
  settings: Partial<PayrollSettings>
): void => {
  payrollSettingsAtom.init = {
    ...payrollSettingsAtom.init,
    ...settings,
  };
};

export const calculatePayrollSummary = (
  periodStart: string,
  periodEnd: string
): PayrollSummary => {
  const items = payrollItemsAtom.init.filter(
    item => item.periodStart === periodStart && item.periodEnd === periodEnd
  );

  return {
    periodStart,
    periodEnd,
    totalEmployees: items.length,
    totalBasicSalary: items.reduce((sum, item) => sum + item.basicSalary, 0),
    totalAllowances: items.reduce(
      (sum, item) => sum + item.allowances.reduce((s, a) => s + a.amount, 0),
      0
    ),
    totalDeductions: items.reduce(
      (sum, item) => sum + item.deductions.reduce((s, d) => s + d.amount, 0),
      0
    ),
    totalTax: items.reduce(
      (sum, item) => sum + item.taxDeductions.reduce((s, t) => s + t.amount, 0),
      0
    ),
    totalKiwiSaver: items.reduce(
      (sum, item) => sum + item.kiwiSaver.employeeContribution + item.kiwiSaver.employerContribution,
      0
    ),
    totalNetSalary: items.reduce((sum, item) => sum + item.netSalary, 0),
    status: 'PENDING',
  };
};