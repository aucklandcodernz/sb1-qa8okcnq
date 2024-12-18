import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { calculatePAYE } from '../../lib/payroll/paye';
import { calculateKiwiSaver, KIWISAVER_RATES } from '../../lib/payroll/kiwisaver';
import { cn } from '../../lib/utils';

export default function PayrollCalculator() {
  const [salary, setSalary] = useState<number>(0);
  const [payFrequency, setPayFrequency] = useState<'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY'>('MONTHLY');
  const [kiwiSaverRate, setKiwiSaverRate] = useState<number>(KIWISAVER_RATES.EMPLOYEE.DEFAULT);
  const [hasStudentLoan, setHasStudentLoan] = useState<boolean>(false);
  const [calculation, setCalculation] = useState<any>(null);

  const handleCalculate = () => {
    const annualSalary = salary * (
      payFrequency === 'WEEKLY' ? 52 :
      payFrequency === 'FORTNIGHTLY' ? 26 : 12
    );

    const paye = calculatePAYE(annualSalary);
    const kiwiSaver = calculateKiwiSaver(annualSalary, kiwiSaverRate);

    const periodTax = paye.totalTax / (
      payFrequency === 'WEEKLY' ? 52 :
      payFrequency === 'FORTNIGHTLY' ? 26 : 12
    );

    const periodKiwiSaver = kiwiSaver.employeeContribution / (
      payFrequency === 'WEEKLY' ? 52 :
      payFrequency === 'FORTNIGHTLY' ? 26 : 12
    );

    setCalculation({
      gross: salary,
      tax: periodTax,
      kiwiSaver: periodKiwiSaver,
      net: salary - periodTax - periodKiwiSaver,
      effectiveRate: paye.effectiveRate,
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-gray-400" />
          Payroll Calculator
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
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as any)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="WEEKLY">Weekly</option>
              <option value="FORTNIGHTLY">Fortnightly</option>
              <option value="MONTHLY">Monthly</option>
            </select>
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
                  <dt className="text-sm text-gray-500">Gross Pay:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${calculation.gross.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">PAYE Tax:</dt>
                  <dd className="text-sm font-medium text-red-600">
                    -${calculation.tax.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">KiwiSaver:</dt>
                  <dd className="text-sm font-medium text-red-600">
                    -${calculation.kiwiSaver.toFixed(2)}
                  </dd>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-900">Net Pay:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculation.net.toFixed(2)}
                    </dd>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Effective tax rate: {(calculation.effectiveRate * 100).toFixed(1)}%
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