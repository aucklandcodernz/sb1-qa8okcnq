import React from 'react';
import { Briefcase, Users, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface JobStatsProps {
  stats: {
    activeJobs: number;
    totalApplications: number;
    avgTimeToHire: number;
    offerAcceptanceRate: number;
  };
}

export default function JobStats({ stats }: JobStatsProps) {
  const metrics = [
    {
      name: 'Active Jobs',
      value: stats.activeJobs,
      change: '+4.75%',
      icon: Briefcase,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Total Applications',
      value: stats.totalApplications,
      change: '+12.3%',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Avg. Time to Hire',
      value: `${stats.avgTimeToHire} days`,
      change: '-2.5 days',
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Offer Acceptance Rate',
      value: `${stats.offerAcceptanceRate}%`,
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden shadow-sm"
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
              <p className={cn(
                'ml-2 flex items-baseline text-sm font-semibold',
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              )}>
                {metric.change}
              </p>
            </dd>
          </div>
        );
      })}
    </div>
  );
}