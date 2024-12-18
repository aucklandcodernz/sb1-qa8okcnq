import React from 'react';
import { useAtom } from 'jotai';
import { Clock, Calendar, Users, Target } from 'lucide-react';
import { dashboardMetricsAtom } from '../../lib/analytics';
import { cn } from '../../lib/utils';

export default function QuickStats() {
  const [metrics] = useAtom(dashboardMetricsAtom);

  const stats = [
    {
      name: 'Time & Attendance',
      value: `${metrics.attendanceRate.value}%`,
      change: metrics.attendanceRate.change,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Leave Requests',
      value: metrics.activeLeaveRequests.value,
      change: metrics.activeLeaveRequests.change,
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Team Members',
      value: metrics.employeeCount.value,
      change: metrics.employeeCount.change,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Performance',
      value: metrics.averagePerformanceScore.value.toFixed(1),
      change: metrics.averagePerformanceScore.change,
      icon: Target,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={cn('p-3 rounded-lg', stat.bgColor)}>
                <Icon className={cn('h-6 w-6', stat.color)} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  {stat.change !== 0 && (
                    <span className={cn(
                      'ml-2 text-sm',
                      stat.change > 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}