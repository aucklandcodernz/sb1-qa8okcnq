import React, { useState } from 'react';
import { format } from 'date-fns';
import { FileText, Download, DollarSign, Calendar } from 'lucide-react';
import { PayrollItem } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface PayslipViewerProps {
  employeeId: string;
  selectedPayslip?: PayrollItem;
}

export default function PayslipViewer({ employeeId, selectedPayslip }: PayslipViewerProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  if (!selectedPayslip) {
    return (
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payslip selected</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a pay period to view the payslip details
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-400" />
            Payslip Details
          </h3>
          <button
            onClick={() => {/* Handle download */}}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Pay Period</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {format(new Date(selectedPayslip.periodStart), 'MMM d')} -{' '}
                {format(new Date(selectedPayslip.periodEnd), 'MMM d, yyyy')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {selectedPayslip.paymentMethod.replace('_', ' ')}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900">Earnings</h4>
            <dl className="mt-2 space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Basic Salary</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${selectedPayslip.basicSalary.toFixed(2)}
                </dd>
              </div>
              {selectedPayslip.allowances.map((allowance, index) => (
                <div key={index} className="flex justify-between">
                  <dt className="text-sm text-gray-500">{allowance.type}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${allowance.amount.toFixed(2)}
                  </dd>
                </div>
              ))}
              {selectedPayslip.overtime.amount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Overtime</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${selectedPayslip.overtime.amount.toFixed(2)}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900">Deductions</h4>
            <dl className="mt-2 space-y-2">
              {selectedPayslip.deductions.map((deduction, index) => (
                <div key={index} className="flex justify-between">
                  <dt className="text-sm text-gray-500">{deduction.type}</dt>
                  <dd className="text-sm font-medium text-red-600">
                    -${deduction.amount.toFixed(2)}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">PAYE Tax</dt>
                <dd className="text-sm font-medium text-red-600">
                  -${selectedPayslip.taxDeductions[0].amount.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">KiwiSaver</dt>
                <dd className="text-sm font-medium text-red-600">
                  -${selectedPayslip.kiwiSaver.employeeContribution.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-900">Net Pay</h4>
              <span className="text-lg font-semibold text-gray-900">
                ${selectedPayslip.netSalary.toFixed(2)}
              </span>
            </div>
          </div>

          {selectedPayslip.comments && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Notes</h4>
              <p className="mt-1 text-sm text-gray-500">
                {selectedPayslip.comments}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}