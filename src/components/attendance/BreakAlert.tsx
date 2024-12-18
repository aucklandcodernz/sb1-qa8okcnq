import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { BreakCompliance } from '../../lib/workHours/compliance';
import { cn } from '../../lib/utils';

interface BreakAlertProps {
  compliance: BreakCompliance;
  className?: string;
}

export default function BreakAlert({ compliance, className }: BreakAlertProps) {
  if (compliance.isCompliant) return null;

  return (
    <div className={cn('rounded-md bg-yellow-50 p-4', className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Break Requirements Not Met
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <ul className="list-disc pl-5 space-y-1">
              {compliance.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
          {compliance.missedBreaks.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-yellow-800">Required Break Times:</h4>
              <ul className="mt-2 space-y-2">
                {compliance.missedBreaks.map((missedBreak, index) => (
                  <li key={index} className="flex items-center text-sm text-yellow-700">
                    <Clock className="h-4 w-4 mr-2" />
                    {missedBreak.type === 'REST_BREAK' ? '10-minute break' : '30-minute meal break'}{' '}
                    at {format(missedBreak.requiredAt, 'HH:mm')}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              >
                Schedule Breaks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}