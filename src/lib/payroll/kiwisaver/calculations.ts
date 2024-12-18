import { KIWISAVER_RATES } from './constants';
import { KiwiSaverContributions, Salary } from '../../../types/payroll';

export const calculateKiwiSaverContributions = (
  salary: Salary,
  employeeRate: number = KIWISAVER_RATES.EMPLOYEE.DEFAULT,
  includeEmployer: boolean = true
): KiwiSaverContributions => {
  // Ensure rate is within bounds
  const validRate = Math.max(
    Math.min(employeeRate, KIWISAVER_RATES.EMPLOYEE.MAX),
    KIWISAVER_RATES.EMPLOYEE.MIN
  );

  // Calculate gross amount for the pay period
  const grossAmount = calculateGrossAmount(salary);

  // Calculate employee contribution
  const employeeContribution = grossAmount * validRate;

  // Calculate employer contribution if applicable
  const employerContribution = includeEmployer 
    ? grossAmount * KIWISAVER_RATES.EMPLOYER.MIN
    : 0;

  return {
    employeeContribution,
    employerContribution,
    totalContribution: employeeContribution + employerContribution,
    employeeRate: validRate,
    employerRate: KIWISAVER_RATES.EMPLOYER.MIN,
  };
};

const calculateGrossAmount = (salary: Salary): number => {
  switch (salary.frequency) {
    case 'HOURLY':
      return salary.amount * salary.hoursPerWeek * 52;
    case 'WEEKLY':
      return salary.amount * 52;
    case 'FORTNIGHTLY':
      return salary.amount * 26;
    case 'MONTHLY':
      return salary.amount * 12;
    case 'ANNUALLY':
      return salary.amount;
    default:
      return 0;
  }
};

export const calculatePayPeriodContributions = (
  annualContributions: KiwiSaverContributions,
  frequency: 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY'
): KiwiSaverContributions => {
  const divisor = frequency === 'WEEKLY' ? 52 : frequency === 'FORTNIGHTLY' ? 26 : 12;

  return {
    employeeContribution: annualContributions.employeeContribution / divisor,
    employerContribution: annualContributions.employerContribution / divisor,
    totalContribution: annualContributions.totalContribution / divisor,
    employeeRate: annualContributions.employeeRate,
    employerRate: annualContributions.employerRate,
  };
};

export const calculateProjectedBalance = (
  currentBalance: number,
  salary: Salary,
  employeeRate: number,
  years: number,
  annualReturnRate: number = 0.05 // 5% default return rate
): {
  finalBalance: number;
  totalContributions: number;
  employeeContributions: number;
  employerContributions: number;
  investmentReturns: number;
} => {
  let balance = currentBalance;
  let totalEmployeeContributions = 0;
  let totalEmployerContributions = 0;

  const annualContributions = calculateKiwiSaverContributions(salary, employeeRate);
  const yearlyContribution = annualContributions.totalContribution;

  for (let year = 1; year <= years; year++) {
    totalEmployeeContributions += annualContributions.employeeContribution;
    totalEmployerContributions += annualContributions.employerContribution;
    
    balance = (balance + yearlyContribution) * (1 + annualReturnRate);
  }

  const totalContributions = totalEmployeeContributions + totalEmployerContributions;
  const investmentReturns = balance - totalContributions - currentBalance;

  return {
    finalBalance: balance,
    totalContributions,
    employeeContributions: totalEmployeeContributions,
    employerContributions: totalEmployerContributions,
    investmentReturns,
  };
};