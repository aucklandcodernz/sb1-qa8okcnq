import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Calendar } from 'lucide-react';
import { PublicHoliday } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface PublicHolidayAlertProps {
  missedHolidays: PublicHoliday[];
  unpaidHolidays: PublicHoliday[];
  className?: string;
}

export default function PublicHolidayAlert({
  missedHolidays,
  unpaidHolidays,
  className,
}: PublicHolidayAlertProps) {
  if (missedHolidays.length === 0 && unpaidHolidays.length === 0) return null;

  return (
    <div className={cn('rounded-md bg-yellow-50 p-4', className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Public Holiday Issues Detected
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            {missedHolidays.length > 0 && (
              <div className="mb-2">
                <p className="font-medium">Missing Holiday Records:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {missedHolidays.map(holiday => (
                    <li key={holiday.date}>
                      {holiday.name} ({format(new Date(holiday.date), 'MMMM d, yyyy')})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {unpaidHolidays.length > 0 && (
              <div>
                <p className="font-medium">Unpaid Holiday Work:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {unpaidHolidays.map(holiday => (
                    <li key={holiday.date}>
                      {holiday.name} ({format(new Date(holiday.date), 'MMMM d, yyyy')})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              >
                Review Holiday Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}