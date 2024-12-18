import React from 'react';
import { DollarSign, TrendingUp, Clock, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PayrollStatsProps {
  employeeId?: string;
  className?: string;
}

export default function PayrollStats({ employeeId, className }: PayrollStatsProps) {
  // Mock data - in a real app, this would come from your state management
  const stats = [
    {
      name: 'Total Earnings',
      value: '$45,230',
      change: '+5.2%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Overtime Hours',
      value: '24.5',
      change: '-2.1%',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Leave Balance',
      value: '15 days',
      change: '0',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'KiwiSaver',
      value: '$2,845',
      change: '+8.3%',
      icon: TrendingUp,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden border border-gray-200"
          >
            <dt>
              <div className={cn('absolute rounded-md p-3', stat.bgColor)}>
                <Icon className={cn('h-6 w-6', stat.color)} />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className={cn(
                'ml-2 flex items-baseline text-sm font-semibold',
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              )}>
                {stat.change}
              </p>
            </dd>
          </div>
        );
      })}
    </div>
  );
}