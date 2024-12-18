import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { calculateKiwiSaverContributions, calculateProjectedBalance } from '../../lib/payroll/kiwisaver/calculations';
import { KIWISAVER_RATES } from '../../lib/payroll/kiwisaver/constants';
import { PayPeriod } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface KiwiSaverCalculatorProps {
  className?: string;
}

export default function KiwiSaverCalculator({ className }: KiwiSaverCalculatorProps) {
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
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          KiwiSaver Calculator
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary/Wages
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pay Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as PayPeriod)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="WEEKLY">Weekly</option>
              <option value="FORTNIGHTLY">Fortnightly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="ANNUALLY">Annually</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Contribution Rate
            </label>
            <select
              value={employeeRate}
              onChange={(e) => setEmployeeRate(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {KIWISAVER_RATES.EMPLOYEE.OPTIONS.map((rate) => (
                <option key={rate} value={rate}>
                  {(rate * 100).toFixed(0)}%
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current KiwiSaver Balance
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Projection Years
            </label>
            <input
              type="number"
              value={projectionYears}
              onChange={(e) => setProjectionYears(Number(e.target.value))}
              min="1"
              max="50"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

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