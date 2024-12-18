import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  actions,
  className,
}: ChartCardProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
          {actions ? (
            actions
          ) : (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View options</span>
              <MoreHorizontal className="h-5 w-5" />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}