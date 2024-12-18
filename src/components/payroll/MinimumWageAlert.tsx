import React from 'react';
import { AlertTriangle, DollarSign, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { MinimumWageCheck } from '../../lib/payroll/minimumWage';
import { cn } from '../../lib/utils';

interface MinimumWageAlertProps {
  check: MinimumWageCheck;
  employeeName?: string;
  className?: string;
}

export default function MinimumWageAlert({
  check,
  employeeName,
  className,
}: MinimumWageAlertProps) {
  if (check.isCompliant) return null;

  return (
    <div className={cn(
      'rounded-md bg-red-50 p-4',
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Minimum Wage Non-Compliance
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              {employeeName ? `${employeeName}'s salary` : 'The current salary'} is below the minimum wage requirement:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Current rate: ${check.actualRate.toFixed(2)}/hour
              </li>
              <li className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Required minimum: ${check.requiredRate.toFixed(2)}/hour
              </li>
              <li className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Shortfall: ${check.shortfall?.toFixed(2)}/hour
              </li>
              <li className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Effective from: {format(new Date(check.effectiveDate), 'MMMM d, yyyy')}
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              >
                Review Salary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}