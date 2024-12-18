import { addMonths } from 'date-fns';

// Current NZ minimum wage rates (as of April 1, 2024)
export const MINIMUM_WAGE_RATES = {
  ADULT: 22.70,      // Adult rate (18 years and over)
  STARTING: 18.16,   // Starting-out rate (16-17 years, or 18-19 in training)
  TRAINING: 18.16,   // Training rate (for specified training contracts)
};

// Future minimum wage updates
export const MINIMUM_WAGE_UPDATES = [
  {
    effectiveDate: '2024-04-01',
    rates: {
      ADULT: 22.70,
      STARTING: 18.16,
      TRAINING: 18.16,
    },
  },
];

export interface MinimumWageCheck {
  isCompliant: boolean;
  actualRate: number;
  requiredRate: number;
  shortfall?: number;
  effectiveDate: string;
}

export const calculateHourlyRate = (
  salary: number,
  hoursPerWeek: number,
  frequency: 'HOURLY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY'
): number => {
  switch (frequency) {
    case 'HOURLY':
      return salary;
    case 'WEEKLY':
      return salary / hoursPerWeek;
    case 'FORTNIGHTLY':
      return salary / (hoursPerWeek * 2);
    case 'MONTHLY':
      return (salary * 12) / (hoursPerWeek * 52);
    case 'ANNUALLY':
      return salary / (hoursPerWeek * 52);
    default:
      return 0;
  }
};

export const checkMinimumWageCompliance = (
  hourlyRate: number,
  employeeType: 'ADULT' | 'STARTING' | 'TRAINING' = 'ADULT',
  checkDate: Date = new Date()
): MinimumWageCheck => {
  // Find the applicable minimum wage rate
  const applicableUpdate = MINIMUM_WAGE_UPDATES
    .filter(update => new Date(update.effectiveDate) <= checkDate)
    .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())[0];

  if (!applicableUpdate) {
    throw new Error('No minimum wage rate found for the specified date');
  }

  const requiredRate = applicableUpdate.rates[employeeType];
  const isCompliant = hourlyRate >= requiredRate;
  
  return {
    isCompliant,
    actualRate: hourlyRate,
    requiredRate,
    shortfall: isCompliant ? undefined : requiredRate - hourlyRate,
    effectiveDate: applicableUpdate.effectiveDate,
  };
};

export const getUpcomingMinimumWageChanges = (
  months: number = 6
): typeof MINIMUM_WAGE_UPDATES => {
  const cutoffDate = addMonths(new Date(), months);
  
  return MINIMUM_WAGE_UPDATES
    .filter(update => {
      const effectiveDate = new Date(update.effectiveDate);
      return effectiveDate > new Date() && effectiveDate <= cutoffDate;
    })
    .sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime());
};

export const getAffectedEmployees = (
  employees: Array<{
    id: string;
    salary: {
      amount: number;
      frequency: 'HOURLY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY';
    };
    workingHours: {
      hoursPerWeek: number;
    };
    employeeType?: 'ADULT' | 'STARTING' | 'TRAINING';
  }>,
  effectiveDate: string
): Array<{ employeeId: string; compliance: MinimumWageCheck }> => {
  return employees
    .map(employee => {
      const hourlyRate = calculateHourlyRate(
        employee.salary.amount,
        employee.workingHours.hoursPerWeek,
        employee.salary.frequency
      );

      const compliance = checkMinimumWageCompliance(
        hourlyRate,
        employee.employeeType || 'ADULT',
        new Date(effectiveDate)
      );

      return {
        employeeId: employee.id,
        compliance,
      };
    })
    .filter(result => !result.compliance.isCompliant);
};