import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { PUBLIC_HOLIDAYS } from '../../lib/payroll/publicHolidays';
import { cn } from '../../lib/utils';

interface PublicHolidayCalendarProps {
  className?: string;
}

export default function PublicHolidayCalendar({ className }: PublicHolidayCalendarProps) {
  const now = new Date();
  const upcomingHolidays = PUBLIC_HOLIDAYS
    .filter(holiday => new Date(holiday.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Upcoming Public Holidays
        </h3>

        <div className="space-y-4">
          {upcomingHolidays.map((holiday) => (
            <div
              key={holiday.date}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {holiday.name}
                </p>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {format(new Date(holiday.date), 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                holiday.type === 'NATIONAL'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              )}>
                {holiday.type}
              </span>
            </div>
          ))}
          {upcomingHolidays.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No upcoming public holidays
            </p>
          )}
        </div>
      </div>
    </div>
  );
}