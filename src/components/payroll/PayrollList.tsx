import React from 'react';
import { format } from 'date-fns';
import { DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { PayrollItem } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface PayrollListProps {
  items: PayrollItem[];
  canManage: boolean;
}

const statusConfig = {
  DRAFT: {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Draft',
  },
  PENDING: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending',
  },
  APPROVED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Approved',
  },
  PAID: {
    icon: DollarSign,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Paid',
  },
};

export default function PayrollList({ items, canManage }: PayrollListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payroll Records</h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {items.map((item) => {
              const status = statusConfig[item.status];
              const StatusIcon = status.icon;
              
              return (
                <li key={item.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', status.bgColor)}>
                        <StatusIcon className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Salary for {format(new Date(item.periodStart), 'MMMM yyyy')}
                        </p>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Basic Salary</p>
                          <p className="font-medium text-gray-900">
                            ${item.basicSalary.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Net Salary</p>
                          <p className="font-medium text-gray-900">
                            ${item.netSalary.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    {canManage && (
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
            {items.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No payroll records found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}