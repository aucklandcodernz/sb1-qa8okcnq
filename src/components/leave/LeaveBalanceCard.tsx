import React from 'react';
import { useAtom } from 'jotai';
import { leaveBalancesAtom } from '../../lib/leave';
import { Calendar } from 'lucide-react';

interface LeaveBalanceCardProps {
  employeeId?: string;
}

export default function LeaveBalanceCard({ employeeId }: LeaveBalanceCardProps) {
  const [leaveBalances] = useAtom(leaveBalancesAtom);
  
  if (!employeeId) return null;
  
  const balance = leaveBalances[employeeId];
  if (!balance) return null;

  const balanceItems = [
    { label: 'Annual Leave', value: balance.annual },
    { label: 'Sick Leave', value: balance.sick },
    { label: 'Parental Leave', value: balance.parental },
    { label: 'Bereavement', value: balance.bereavement },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Balance</h3>
        <div className="space-y-4">
          {balanceItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {item.value} days
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}