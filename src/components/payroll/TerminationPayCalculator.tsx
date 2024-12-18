import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Clock } from 'lucide-react';
import { calculateTerminationPay, validateTerminationNotice } from '../../lib/payroll/termination';
import { cn } from '../../lib/utils';

interface TerminationPayCalculatorProps {
  className?: string;
  onClose?: () => void;
}

export default function TerminationPayCalculator({ 
  className,
  onClose 
}: TerminationPayCalculatorProps) {
  const [lastDay, setLastDay] = useState('');
  const [salary, setSalary] = useState('');
  const [salaryFrequency, setSalaryFrequency] = useState<'HOURLY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY'>('MONTHLY');
  const [unusedLeave, setUnusedLeave] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [employmentType, setEmploymentType] = useState<'PERMANENT' | 'FIXED_TERM' | 'CASUAL'>('PERMANENT');
  const [lengthOfService, setLengthOfService] = useState('');
  const [calculation, setCalculation] = useState<any>(null);
  const [noticeValidation, setNoticeValidation] = useState<any>(null);

  const handleCalculate = () => {
    // Validate notice period
    const validation = validateTerminationNotice(
      employmentType,
      parseInt(lengthOfService),
      parseInt(noticePeriod)
    );
    setNoticeValidation(validation);

    // Calculate termination pay
    const result = calculateTerminationPay(
      new Date(lastDay),
      {
        amount: parseFloat(salary),
        frequency: salaryFrequency,
      },
      parseFloat(unusedLeave),
      parseInt(noticePeriod)
    );
    setCalculation(result);
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-gray-400" />
            Final Pay Calculator
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Working Day
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={lastDay}
                  onChange={(e) => setLastDay(e.target.value)}
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="PERMANENT">Permanent</option>
                <option value="FIXED_TERM">Fixed Term</option>
                <option value="CASUAL">Casual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary/Wage
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Frequency
              </label>
              <select
                value={salaryFrequency}
                onChange={(e) => setSalaryFrequency(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="HOURLY">Hourly</option>
                <option value="WEEKLY">Weekly</option>
                <option value="FORTNIGHTLY">Fortnightly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="ANNUALLY">Annually</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unused Leave (hours)
              </label>
              <input
                type="number"
                value={unusedLeave}
                onChange={(e) => setUnusedLeave(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notice Period (days)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Length of Service (months)
            </label>
            <input
              type="number"
              value={lengthOfService}
              onChange={(e) => setLengthOfService(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate
          </button>

          {noticeValidation && !noticeValidation.isValid && (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Notice Period Warning
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Required notice period is {noticeValidation.requiredNotice} days.
                      Current notice period is {noticePeriod} days
                      (shortfall of {noticeValidation.shortfall} days).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {calculation && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Calculation Result</h4>
              <dl className="space-y-2">
                {calculation.breakdown.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <dt className="text-sm text-gray-500">
                      {item.category}
                      {item.details && (
                        <span className="text-xs text-gray-400 ml-1">
                          ({item.details})
                        </span>
                      )}
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${item.amount.toFixed(2)}
                    </dd>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-900">Total</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.total.toFixed(2)}
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