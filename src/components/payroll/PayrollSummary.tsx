import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { DollarSign, Calendar, Clock } from 'lucide-react';
import { payrollItemsAtom } from '../../lib/payroll';
import { cn } from '../../lib/utils';

interface PayrollSummaryProps {
  employeeId: string;
  className?: string;
}

export default function PayrollSummary({ employeeId, className }: PayrollSummaryProps) {
  const [payrollItems] = useAtom(payrollItemsAtom);
  
  // Get the latest payroll item for this employee
  const latestPayroll = payrollItems
    .filter(item => item.employeeId === employeeId)
    .sort((a, b) => new Date(b.periodEnd).getTime() - new Date(a.periodEnd).getTime())[0];

  if (!latestPayroll) {
    return (
      <div className={cn('bg-white shadow-sm rounded-lg', className)}>
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center text-gray-500">
            No payroll information available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
            Current Period Summary
          </h3>
          <div className="text-sm text-gray-500">
            {format(new Date(latestPayroll.periodStart), 'MMM d')} - {format(new Date(latestPayroll.periodEnd), 'MMM d, yyyy')}
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Basic Salary
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${latestPayroll.basicSalary.toLocaleString()}
            </dd>
          </div>

          <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Net Pay
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${latestPayroll.netSalary.toLocaleString()}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Allowances</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${latestPayroll.allowances.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Deductions</dt>
              <dd className="text-sm font-medium text-red-600">
                -${latestPayroll.deductions.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Tax</dt>
              <dd className="text-sm font-medium text-red-600">
                -${latestPayroll.taxDeductions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">KiwiSaver</dt>
              <dd className="text-sm font-medium text-red-600">
                -${latestPayroll.kiwiSaver.employeeContribution.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}