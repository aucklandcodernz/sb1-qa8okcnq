import React from 'react';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
    label?: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export default function MetricsCard({
  title,
  value,
  change,
  icon,
  className,
}: MetricsCardProps) {
  return (
    <div className={cn(
      'relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden shadow-sm border border-gray-100',
      'group hover:border-gray-200 transition-colors',
      className
    )}>
      <dt>
        {icon && (
          <div className="absolute rounded-lg p-3 bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
            {icon}
          </div>
        )}
        <p className={cn(
          'text-sm font-medium text-gray-500 truncate',
          icon && 'ml-16'
        )}>
          {title}
        </p>
      </dt>
      <dd className={cn(
        'flex items-baseline pb-6 sm:pb-7',
        icon && 'ml-16'
      )}>
        <p className="text-2xl font-semibold text-gray-900">
          {value}
        </p>
        {change && (
          <div className="ml-2 flex items-baseline text-sm font-semibold">
            <span className={cn(
              change.trend === 'up' ? 'text-green-600' : 
              change.trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            )}>
              <span className="flex items-center">
                {change.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : change.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : null}
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
            </span>
            {change.label && (
              <span className="text-gray-500 ml-1">
                {change.label}
              </span>
            )}
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 group-hover:bg-gray-100 transition-colors">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              View details
            </a>
          </div>
        </div>
      </dd>
    </div>
  );
}