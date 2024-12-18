import React from 'react';
import { format } from 'date-fns';
import { DollarSign, Clock, FileText, Download } from 'lucide-react';
import { PayrollItem } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface PayrollDetailsProps {
  payroll: PayrollItem;
  onClose: () => void;
}

export default function PayrollDetails({ payroll, onClose }: PayrollDetailsProps) {
  const sections = [
    {
      title: 'Earnings',
      items: [
        { label: 'Basic Salary', value: payroll.basicSalary },
        ...payroll.allowances.map(a => ({ label: a.type, value: a.amount })),
        { label: 'Overtime', value: payroll.overtime.amount },
      ],
    },
    {
      title: 'Deductions',
      items: [
        ...payroll.deductions.map(d => ({ label: d.type, value: -d.amount })),
        { label: 'Tax', value: -payroll.tax },
      ],
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
            Payroll Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Period</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {format(new Date(payroll.periodStart), 'MMM d')} -{' '}
                {format(new Date(payroll.periodEnd), 'MMM d, yyyy')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {payroll.paymentMethod.replace('_', ' ')}
              </p>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                {section.title}
              </h4>
              <dl className="space-y-2">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 text-sm border-b border-gray-100"
                  >
                    <dt className="text-gray-500">{item.label}</dt>
                    <dd className={cn(
                      'font-medium',
                      item.value < 0 ? 'text-red-600' : 'text-gray-900'
                    )}>
                      ${Math.abs(item.value).toLocaleString()}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-900">Net Salary</p>
              <p className="text-lg font-semibold text-gray-900">
                ${payroll.netSalary.toLocaleString()}
              </p>
            </div>
          </div>

          {payroll.comments && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Comments</p>
              <p className="mt-1 text-sm text-gray-900">{payroll.comments}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Payslip
            </button>
            {payroll.status === 'PENDING' && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}