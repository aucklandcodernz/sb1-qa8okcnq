import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, DollarSign } from 'lucide-react';
import { MINIMUM_WAGE_UPDATES } from '../../lib/payroll/minimumWage';
import { cn } from '../../lib/utils';

interface MinimumWageUpdatesCardProps {
  className?: string;
}

export default function MinimumWageUpdatesCard({ className }: MinimumWageUpdatesCardProps) {
  const upcomingUpdates = MINIMUM_WAGE_UPDATES
    .filter(update => new Date(update.effectiveDate) > new Date())
    .sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime());

  if (upcomingUpdates.length === 0) return null;

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
          Upcoming Minimum Wage Changes
        </h3>

        <div className="space-y-4">
          {upcomingUpdates.map((update) => (
            <div
              key={update.effectiveDate}
              className="bg-yellow-50 border border-yellow-100 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-800">
                  Effective from {format(new Date(update.effectiveDate), 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-800">Adult Rate:</span>
                  <span className="font-medium text-yellow-900">
                    ${update.rates.ADULT.toFixed(2)}/hour
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-800">Starting-Out Rate:</span>
                  <span className="font-medium text-yellow-900">
                    ${update.rates.STARTING.toFixed(2)}/hour
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-800">Training Rate:</span>
                  <span className="font-medium text-yellow-900">
                    ${update.rates.TRAINING.toFixed(2)}/hour
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>
            Please ensure all employee salaries are reviewed and adjusted before the effective dates
            to maintain compliance with minimum wage regulations.
          </p>
        </div>
      </div>
    </div>
  );
}