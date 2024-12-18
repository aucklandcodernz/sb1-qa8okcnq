import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
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

export default function StatCard({
  title,
  value,
  change,
  icon,
  className,
}: StatCardProps) {
  return (
    <div className={cn(
      'relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden shadow-sm',
      className
    )}>
      <dt>
        {icon && (
          <div className="absolute rounded-md p-3 bg-indigo-50">
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
          <div className="flex items-baseline text-sm font-semibold ml-2">
            <span
              className={cn(
                change.trend === 'up' && 'text-green-600',
                change.trend === 'down' && 'text-red-600',
                change.trend === 'neutral' && 'text-gray-600'
              )}
            >
              <span className="flex items-center">
                {change.trend === 'up' && <ArrowUp className="h-4 w-4 mr-1" />}
                {change.trend === 'down' && <ArrowDown className="h-4 w-4 mr-1" />}
                {change.value}%
              </span>
            </span>
            {change.label && (
              <span className="text-gray-500 ml-1">
                {change.label}
              </span>
            )}
          </div>
        )}
      </dd>
    </div>
  );
}