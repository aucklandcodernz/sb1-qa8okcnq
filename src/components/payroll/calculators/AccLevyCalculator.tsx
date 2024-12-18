import React, { useState } from 'react';
import { Calculator, DollarSign, Building2 } from 'lucide-react';
import { calculateAccLevies, calculatePayPeriodLevies } from '../../../lib/payroll/acc/calculations';
import { INDUSTRY_RATES } from '../../../lib/payroll/acc/constants';
import { PayPeriod } from '../../../types/payroll';
import { cn } from '../../../lib/utils';

interface AccLevyCalculatorProps {
  className?: string;
}

export default function AccLevyCalculator({ className }: AccLevyCalculatorProps) {
  const [annualEarnings, setAnnualEarnings] = useState<number>(0);
  const [industryCode, setIndustryCode] = useState<string>('');
  const [isEmployer, setIsEmployer] = useState<boolean>(false);
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('ANNUALLY');
  const [calculation, setCalculation] = useState<any>(null);

  const handleCalculate = () => {
    if (payPeriod === 'ANNUALLY') {
      const result = calculateAccLevies(annualEarnings, industryCode, isEmployer);
      setCalculation(result);
    } else {
      const result = calculatePayPeriodLevies(
        annualEarnings,
        industryCode,
        payPeriod,
        isEmployer
      );
      setCalculation(result);
    }
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          ACC Levy Calculator
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Annual Earnings
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={annualEarnings}
                onChange={(e) => setAnnualEarnings(Number(e.target.value))}
                className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Industry Classification
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={industryCode}
                onChange={(e) => setIndustryCode(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select industry</option>
                {Object.entries(INDUSTRY_RATES).map(([code, info]) => (
                  <option key={code} value={code}>
                    {code} - {info.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pay Period
            </label>
            <select
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value as PayPeriod)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="WEEKLY">Weekly</option>
              <option value="FORTNIGHTLY">Fortnightly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="ANNUALLY">Annually</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isEmployer}
              onChange={(e) => setIsEmployer(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Calculate employer levies
            </label>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate Levies
          </button>

          {calculation && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Levy Calculation</h4>
              <dl className="space-y-2">
                {calculation.breakdown.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <dt className="text-sm text-gray-500">{item.category}:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${item.amount.toFixed(2)}
                      {item.maxEarnings && (
                        <span className="text-xs text-gray-500 ml-1">
                          (max ${item.maxEarnings.toLocaleString()})
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-900">
                      Total {payPeriod.toLowerCase()} Levies:
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.total.toFixed(2)}
                    </dd>
                  </div>
                  {payPeriod !== 'ANNUALLY' && (
                    <div className="mt-1 text-xs text-gray-500">
                      Annual: ${(calculation.total * (payPeriod === 'MONTHLY' ? 12 : payPeriod === 'FORTNIGHTLY' ? 26 : 52)).toFixed(2)}
                    </div>
                  )}
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}