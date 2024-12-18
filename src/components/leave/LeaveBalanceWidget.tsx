import React from 'react';
import { useAtom } from 'jotai';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { leaveBalancesAtom } from '../../lib/leave';
import { cn } from '../../lib/utils';

interface LeaveBalanceWidgetProps {
  employeeId?: string;
  className?: string;
}

export default function LeaveBalanceWidget({ employeeId, className }: LeaveBalanceWidgetProps) {
  const [leaveBalances] = useAtom(leaveBalancesAtom);
  const balance = employeeId ? leaveBalances[employeeId] : null;

  if (!balance) {
    return (
      <div className={cn('bg-white shadow-sm rounded-lg', className)}>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
              Leave Balance
            </h3>
          </div>
          <p className="text-sm text-gray-500 text-center">
            No leave balance information available
          </p>
        </div>
      </div>
    );
  }

  const categories = [
    { label: 'Annual Leave', value: balance.annual, color: 'bg-blue-100 text-blue-800' },
    { label: 'Sick Leave', value: balance.sick, color: 'bg-green-100 text-green-800' },
    { label: 'Parental Leave', value: balance.parental, color: 'bg-purple-100 text-purple-800' },
    { label: 'Bereavement', value: balance.bereavement, color: 'bg-gray-100 text-gray-800' },
  ];

  const lowBalance = balance.annual < 5;

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            Leave Balance
          </h3>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category.label}
              className="p-4 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{category.label}</span>
                <span className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  category.color
                )}>
                  {category.value} days
                </span>
              </div>
            </div>
          ))}
        </div>

        {lowBalance && (
          <div className="mt-4 p-4 rounded-lg bg-yellow-50 flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Low Annual Leave Balance</h4>
              <p className="mt-1 text-sm text-yellow-700">
                You have less than 5 days of annual leave remaining. Consider planning your leave carefully.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}