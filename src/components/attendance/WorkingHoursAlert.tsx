import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ComplianceCheck } from '../../lib/workHours/compliance';
import { cn } from '../../lib/utils';

interface WorkingHoursAlertProps {
  compliance: ComplianceCheck;
  className?: string;
}

export default function WorkingHoursAlert({ compliance, className }: WorkingHoursAlertProps) {
  if (compliance.isCompliant) return null;

  return (
    <div className={cn('rounded-md bg-red-50 p-4', className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Working Hours Compliance Issues
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {compliance.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              >
                Review Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}