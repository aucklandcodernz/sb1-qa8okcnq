import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar } from 'lucide-react';
import { calculateHolidayPay } from '../../../lib/payroll/nz/holidays';
import FormField from '../../ui/FormField';
import { cn } from '../../../lib/utils';

export default function HolidayPayCalculator() {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursWorked, setHoursWorked] = useState<number>(0);
  const [isPublicHoliday, setIsPublicHoliday] = useState(false);
  const [includeAlternativeDay, setIncludeAlternativeDay] = useState(false);
  const [calculation, setCalculation] = useState<any>(null);

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
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          NZ Holiday Pay Calculator
        </h3>

        <div className="space-y-6">
          <FormField
            label="Hourly Rate"
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
            step="0.01"
          />

          <FormField
            label="Hours Worked"
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(Number(e.target.value))}
            step="0.5"
          />

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