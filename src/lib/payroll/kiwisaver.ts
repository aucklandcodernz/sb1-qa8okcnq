export const KIWISAVER_RATES = {
  EMPLOYEE: {
    MIN: 0.03, // 3%
    MAX: 0.10, // 10%
    DEFAULT: 0.03,
  },
  EMPLOYER: {
    MIN: 0.03, // 3%
    COMPULSORY: true,
  },
};

export const calculateKiwiSaver = (
  grossPay: number,
  employeeRate: number,
  includeEmployer: boolean = true
): {
  employeeContribution: number;
  employerContribution: number;
  total: number;
} => {
  // Ensure rate is within bounds
  const validRate = Math.max(
    Math.min(employeeRate, KIWISAVER_RATES.EMPLOYEE.MAX),
    KIWISAVER_RATES.EMPLOYEE.MIN
  );

  const employeeContribution = grossPay * validRate;
  const employerContribution = includeEmployer ? grossPay * KIWISAVER_RATES.EMPLOYER.MIN : 0;

  return {
    employeeContribution,
    employerContribution,
    total: employeeContribution + employerContribution,
  };
};

export const validateKiwiSaverRate = (rate: number): boolean => {
  return rate >= KIWISAVER_RATES.EMPLOYEE.MIN && rate <= KIWISAVER_RATES.EMPLOYEE.MAX;
};

export const getKiwiSaverProjection = (
  currentSalary: number,
  employeeRate: number,
  currentBalance: number = 0,
  yearsToProject: number = 30,
  annualReturnRate: number = 0.05 // 5% average return
): {
  balance: number;
  totalContributions: {
    employee: number;
    employer: number;
    total: number;
  };
  projectedReturns: number;
} => {
  let balance = currentBalance;
  let totalEmployeeContribution = 0;
  let totalEmployerContribution = 0;

  for (let year = 1; year <= yearsToProject; year++) {
    const { employeeContribution, employerContribution } = calculateKiwiSaver(
      currentSalary,
      employeeRate
    );

    totalEmployeeContribution += employeeContribution;
    totalEmployerContribution += employerContribution;
    
    const yearlyContribution = employeeContribution + employerContribution;
    balance = (balance + yearlyContribution) * (1 + annualReturnRate);
  }

  const totalContributions = totalEmployeeContribution + totalEmployerContribution;
  const projectedReturns = balance - totalContributions;

  return {
    balance,
    totalContributions: {
      employee: totalEmployeeContribution,
      employer: totalEmployerContribution,
      total: totalContributions,
    },
    projectedReturns,
  };
};