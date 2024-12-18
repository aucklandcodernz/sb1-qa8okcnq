import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar } from 'lucide-react';
import { calculateHolidayPay } from '../../lib/payroll/holidays/calculations';
import { HOLIDAY_PAY_RATES } from '../../lib/payroll/holidays/constants';
import { cn } from '../../lib/utils';

interface HolidayPayCalculatorProps {
  className?: string;
}

export default function HolidayPayCalculator({ className }: HolidayPayCalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursWorked, setHoursWorked] = useState<number>(0);
  const [isPublicHoliday, setIsPublicHoliday] = useState(false);
  const [includeAlternativeDay, setIncludeAlternativeDay] = useState(false);
  const [calculation, setCalculation] = useState<ReturnType<typeof calculateHolidayPay>>();

  const handleCalculate = () => {
    const result = calculateHolidayPay(
      hourlyRate,
      hoursWorked,
      isPublicHoliday,
      includeAlternativeDay
    );
    setCalculation(result);
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          Holiday Pay Calculator
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hourly Rate
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hours Worked
            </label>
            <input
              type="number"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(Number(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              placeholder="0"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isPublicHoliday}
                onChange={(e) => setIsPublicHoliday(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Public Holiday
              </label>
            </div>

            {isPublicHoliday && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeAlternativeDay}
                  onChange={(e) => setIncludeAlternativeDay(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Include Alternative Holiday
                </label>
              </div>
            )}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate
          </button>

          {calculation && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Calculation Result</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Base Rate:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${calculation.breakdown.baseRate.toFixed(2)}/hour
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Holiday Rate:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {calculation.breakdown.holidayRate}x
                  </dd>
                </div>
                {calculation.alternativeDay && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Alternative Day:</dt>
                    <dd className="text-sm font-medium text-green-600">
                      Yes (+1 day)
                    </dd>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-900">Total Pay:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.amount.toFixed(2)}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}