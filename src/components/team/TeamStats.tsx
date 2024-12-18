import React from 'react';
import { Users, Clock, Calendar, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TeamStatsProps {
  stats: {
    totalEmployees: number;
    attendanceRate: number;
    leaveRequests: number;
    averagePerformance: number;
  };
  className?: string;
}

export default function TeamStats({ stats, className }: TeamStatsProps) {
  const metrics = [
    {
      name: 'Total Employees',
      value: stats.totalEmployees,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Leave Requests',
      value: stats.leaveRequests,
      icon: Calendar,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Avg Performance',
      value: stats.averagePerformance.toFixed(1),
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden border border-gray-200"
              >
                <dt>
                  <div className={cn('absolute rounded-md p-3', metric.bgColor)}>
                    <Icon className={cn('h-6 w-6', metric.color)} />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {metric.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {metric.value}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}