import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { calculateTakeHomePay } from '../../lib/payroll/paye/calculations';
import { TAX_CODES } from '../../lib/payroll/paye/constants';
import { PayPeriod, TaxCode } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface PayeCalculatorProps {
  className?: string;
}

export default function PayeCalculator({ className }: PayeCalculatorProps) {
  const [income, setIncome] = useState<number>(0);
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('ANNUALLY');
  const [taxCode, setTaxCode] = useState<TaxCode>('M');
  const [hasStudentLoan, setHasStudentLoan] = useState(false);
  const [kiwiSaverRate, setKiwiSaverRate] = useState(0.03);
  const [calculation, setCalculation] = useState<ReturnType<typeof calculateTakeHomePay> | null>(null);

  const handleCalculate = () => {
    const result = calculateTakeHomePay(
      income,
      payPeriod,
      taxCode,
      hasStudentLoan,
      kiwiSaverRate
    );
    setCalculation(result);
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          PAYE Calculator
        </h3>

        <div className="space-y-6">
          {/* Calculator form content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Income Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Rest of the calculator form */}
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tax Code
            </label>
            <select
              value={taxCode}
              onChange={(e) => setTaxCode(e.target.value as TaxCode)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {Object.entries(TAX_CODES).map(([code, description]) => (
                <option key={code} value={code}>
                  {code} - {description}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={hasStudentLoan}
                onChange={(e) => setHasStudentLoan(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I have a student loan
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                KiwiSaver Rate
              </label>
              <select
                value={kiwiSaverRate}
                onChange={(e) => setKiwiSaverRate(Number(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value={0.03}>3%</option>
                <option value={0.04}>4%</option>
                <option value={0.06}>6%</option>
                <option value={0.08}>8%</option>
                <option value={0.10}>10%</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate Take-Home Pay
          </button>

          {calculation && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Calculation Result</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Gross Income:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${calculation.grossIncome.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">PAYE Tax:</dt>
                  <dd className="text-sm font-medium text-red-600">
                    -${calculation.paye.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">ACC Levy:</dt>
                  <dd className="text-sm font-medium text-red-600">
                    -${calculation.acc.toFixed(2)}
                  </dd>
                </div>
                {hasStudentLoan && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Student Loan:</dt>
                    <dd className="text-sm font-medium text-red-600">
                      -${calculation.studentLoan.toFixed(2)}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">KiwiSaver:</dt>
                  <dd className="text-sm font-medium text-red-600">
                    -${calculation.kiwiSaver.toFixed(2)}
                  </dd>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-900">Take-Home Pay:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.netIncome.toFixed(2)}
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