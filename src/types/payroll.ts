export type PayPeriod = 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY';
export type TaxCode = 'M' | 'ME' | 'SB' | 'S' | 'SH' | 'ST' | 'SA' | 'CAE' | 'EDW' | 'NSW' | 'STC';

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface TaxCalculation {
  totalTax: number;
  effectiveRate: number;
  brackets: {
    amount: number;
    rate: number;
    tax: number;
  }[];
}

export interface KiwiSaverRate {
  EMPLOYEE: {
    MIN: number;
    MAX: number;
    DEFAULT: number;
    OPTIONS: number[];
  };
  EMPLOYER: {
    MIN: number;
    COMPULSORY: boolean;
  };
}

export interface KiwiSaverContributions {
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  employeeRate: number;
  employerRate: number;
}

export interface Salary {
  amount: number;
  frequency: PayPeriod;
  hoursPerWeek?: number;
}

export interface PayrollItem {
  id: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  basicSalary: number;
  allowances: {
    type: string;
    amount: number;
    taxable: boolean;
  }[];
  deductions: {
    type: string;
    amount: number;
  }[];
  overtime: {
    hours: number;
    rate: number;
    amount: number;
  };
  taxCode: TaxCode;
  taxableIncome: number;
  taxDeductions: {
    type: string;
    amount: number;
    rate: number;
  }[];
  kiwiSaver: {
    employeeContribution: number;
    employerContribution: number;
    rate: number;
  };
  netSalary: number;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'PAID';
  paymentMethod: 'BANK_TRANSFER' | 'CHECK' | 'CASH';
  paymentDate?: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollSummary {
  periodStart: string;
  periodEnd: string;
  totalEmployees: number;
  totalBasicSalary: number;
  totalAllowances: number;
  totalDeductions: number;
  totalTax: number;
  totalKiwiSaver: number;
  totalNetSalary: number;
  status: PayrollItem['status'];
}

export interface PayrollSettings {
  payFrequency: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY';
  payDay: number;
  defaultPaymentMethod: PayrollItem['paymentMethod'];
  defaultKiwiSaverRate: number;
  allowances: {
    type: string;
    taxable: boolean;
    defaultAmount?: number;
  }[];
  deductions: {
    type: string;
    defaultAmount?: number;
  }[];
  overtimeRates: {
    type: string;
    multiplier: number;
  }[];
}

export interface PayrollReport {
  id: string;
  type: 'PAYSLIP' | 'SUMMARY' | 'TAX' | 'KIWISAVER';
  periodStart: string;
  periodEnd: string;
  generatedAt: string;
  format: 'PDF' | 'CSV' | 'EXCEL';
  url: string;
}