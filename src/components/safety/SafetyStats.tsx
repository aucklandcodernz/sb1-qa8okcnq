import React from 'react';
import { Shield, AlertTriangle, Users, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SafetyStatsProps {
  className?: string;
}

export default function SafetyStats({ className }: SafetyStatsProps) {
  const stats = [
    {
      name: 'Active Hazards',
      value: 3,
      change: '-2',
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Days Since Last Incident',
      value: 45,
      change: '+5',
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Training Compliance',
      value: '92%',
      change: '+2%',
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Resolved Issues',
      value: 12,
      change: '+3',
      icon: Users,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Safety Statistics</h3>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </dl>
      </div>
    </div>
  );
}