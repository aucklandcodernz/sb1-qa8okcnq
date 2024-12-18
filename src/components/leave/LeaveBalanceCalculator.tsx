import React, { useState } from 'react';
import { Calculator, Calendar } from 'lucide-react';
import { calculateLeaveBalance, calculateLeaveAccrual } from '../../lib/leave/entitlements';
import { cn } from '../../lib/utils';

interface LeaveBalanceCalculatorProps {
  className?: string;
}

export default function LeaveBalanceCalculator({ className }: LeaveBalanceCalculatorProps) {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [calculation, setCalculation] = useState<any>(null);

  const handleCalculate = () => {
    const accrual = calculateLeaveAccrual(new Date(startDate), undefined, hoursPerWeek);
    const balance = calculateLeaveBalance(accrual, currentBalance);
    
    setCalculation({
      accrual,
      balance,
      annualEntitlement: hoursPerWeek * 4, // 4 weeks per year
    });
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          Leave Balance Calculator
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employment Start Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hours Per Week
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Leave Balance (hours)
            </label>
            <input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate Leave Balance
          </button>

          {calculation && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Leave Calculation</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Annual Entitlement:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {calculation.annualEntitlement} hours
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Accrued Leave:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {calculation.accrual} hours
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Current Balance:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {calculation.balance} hours
                  </dd>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-900">Days Available:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {(calculation.balance / (hoursPerWeek / 5)).toFixed(1)} days
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