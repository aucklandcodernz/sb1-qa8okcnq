import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { calculateKiwiSaverContributions, calculateProjectedBalance } from '../../../lib/payroll/kiwisaver/calculations';
import { KIWISAVER_RATES } from '../../../lib/payroll/kiwisaver/constants';
import { PayPeriod } from '../../../types/payroll';
import FormField from '../../ui/FormField';
import FormSelect from '../../ui/FormSelect';
import { cn } from '../../../lib/utils';

export default function KiwiSaverCalculator() {
  const [salary, setSalary] = useState<number>(0);
  const [frequency, setFrequency] = useState<PayPeriod>('ANNUALLY');
  const [employeeRate, setEmployeeRate] = useState<number>(KIWISAVER_RATES.EMPLOYEE.DEFAULT);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [projectionYears, setProjectionYears] = useState<number>(30);
  const [calculation, setCalculation] = useState<any>(null);

  const handleCalculate = () => {
    const contributions = calculateKiwiSaverContributions(
      { amount: salary, frequency, hoursPerWeek: 40 },
      employeeRate
    );

    const projection = calculateProjectedBalance(
      currentBalance,
      { amount: salary, frequency, hoursPerWeek: 40 },
      employeeRate,
      projectionYears
    );

    setCalculation({ contributions, projection });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          KiwiSaver Calculator
        </h3>

        <div className="space-y-6">
          <FormField
            label="Salary/Wages"
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
            placeholder="Enter your salary"
          />

          <FormSelect
            label="Pay Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as PayPeriod)}
            options={[
              { value: 'WEEKLY', label: 'Weekly' },
              { value: 'FORTNIGHTLY', label: 'Fortnightly' },
              { value: 'MONTHLY', label: 'Monthly' },
              { value: 'ANNUALLY', label: 'Annually' },
            ]}
          />

          <FormSelect
            label="Employee Contribution Rate"
            value={employeeRate.toString()}
            onChange={(e) => setEmployeeRate(Number(e.target.value))}
            options={KIWISAVER_RATES.EMPLOYEE.OPTIONS.map(rate => ({
              value: rate.toString(),
              label: `${(rate * 100).toFixed(0)}%`,
            }))}
          />

          <FormField
            label="Current KiwiSaver Balance"
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(Number(e.target.value))}
            leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
            placeholder="0.00"
          />

          <FormField
            label="Projection Years"
            type="number"
            value={projectionYears}
            onChange={(e) => setProjectionYears(Number(e.target.value))}
            min="1"
            max="50"
          />

          <button
            onClick={handleCalculate}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate
          </button>

          {calculation && (
            <div className="mt-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Current Contributions</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Employee Contribution:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.contributions.employeeContribution.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Employer Contribution:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.contributions.employerContribution.toFixed(2)}
                    </dd>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-900">Total Annual Contribution:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${calculation.contributions.totalContribution.toFixed(2)}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                  <TrendingUp className="h-4 w-4 mr-2 text-gray-400" />
                  Projected Balance after {projectionYears} years
                </h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Total Contributions:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.projection.totalContributions.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Investment Returns:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.projection.investmentReturns.toFixed(2)}
                    </dd>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-900">Projected Balance:</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${calculation.projection.finalBalance.toFixed(2)}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}