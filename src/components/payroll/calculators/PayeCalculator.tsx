import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { calculateTakeHomePay } from '../../../lib/payroll/paye/calculations';
import { TAX_CODES } from '../../../lib/payroll/paye/constants';
import { PayPeriod, TaxCode } from '../../../types/payroll';
import FormField from '../../ui/FormField';
import FormSelect from '../../ui/FormSelect';
import { cn } from '../../../lib/utils';

export default function PayeCalculator() {
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
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <Calculator className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">PAYE Calculator</h3>
        </div>

        <div className="space-y-6">
          <FormField
            label="Income"
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
            placeholder="Enter your income"
          />

          <FormSelect
            label="Pay Period"
            value={payPeriod}
            onChange={(e) => setPayPeriod(e.target.value as PayPeriod)}
            options={[
              { value: 'WEEKLY', label: 'Weekly' },
              { value: 'FORTNIGHTLY', label: 'Fortnightly' },
              { value: 'MONTHLY', label: 'Monthly' },
              { value: 'ANNUALLY', label: 'Annually' },
            ]}
          />

          <FormSelect
            label="Tax Code"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value as TaxCode)}
            options={Object.entries(TAX_CODES).map(([code, description]) => ({
              value: code,
              label: `${code} - ${description}`,
            }))}
          />

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

          <FormSelect
            label="KiwiSaver Rate"
            value={kiwiSaverRate.toString()}
            onChange={(e) => setKiwiSaverRate(Number(e.target.value))}
            options={[
              { value: '0.03', label: '3%' },
              { value: '0.04', label: '4%' },
              { value: '0.06', label: '6%' },
              { value: '0.08', label: '8%' },
              { value: '0.10', label: '10%' },
            ]}
          />

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