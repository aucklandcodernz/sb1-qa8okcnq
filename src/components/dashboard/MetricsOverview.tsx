import React from 'react';
import { useAtom } from 'jotai';
import { 
  Users, 
  Building2, 
  Calendar, 
  Clock, 
  Target,
  BookOpen,
  Briefcase,
  UserMinus
} from 'lucide-react';
import { dashboardMetricsAtom } from '../../lib/analytics';
import { cn } from '../../lib/utils';

export default function MetricsOverview() {
  const [metrics] = useAtom(dashboardMetricsAtom);

  const stats = [
    {
      name: 'Total Employees',
      value: metrics.employeeCount.value,
      change: `${metrics.employeeCount.change > 0 ? '+' : ''}${metrics.employeeCount.change}%`,
      trend: metrics.employeeCount.trend,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Attendance Rate',
      value: `${metrics.attendanceRate.value}%`,
      change: `${metrics.attendanceRate.change > 0 ? '+' : ''}${metrics.attendanceRate.change}%`,
      trend: metrics.attendanceRate.trend,
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Leave Requests',
      value: metrics.activeLeaveRequests.value,
      change: `${metrics.activeLeaveRequests.change > 0 ? '+' : ''}${metrics.activeLeaveRequests.change}%`,
      trend: metrics.activeLeaveRequests.trend,
      icon: Calendar,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Performance',
      value: metrics.averagePerformanceScore.value.toFixed(1),
      change: `${metrics.averagePerformanceScore.change > 0 ? '+' : ''}${metrics.averagePerformanceScore.change}%`,
      trend: metrics.averagePerformanceScore.trend,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'UP';
        const isNegative = stat.trend === 'DOWN';

        return (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden shadow-sm border border-gray-100 group hover:border-gray-200 transition-colors"
          >
            <dt>
              <div className={cn(
                'absolute rounded-lg p-3 transition-colors',
                stat.bgColor,
                'group-hover:bg-opacity-80'
              )}>
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
                isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
              )}>
                {stat.change}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View details
                  </a>
                </div>
              </div>
            </dd>
          </div>
        );
      })}
    </div>
  );
}