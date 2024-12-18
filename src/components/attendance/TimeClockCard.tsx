import React, { memo } from 'react';
import { format } from 'date-fns';
import { Clock, MapPin } from 'lucide-react';
import { TimeEntry } from '../../types/attendance';
import { cn } from '../../lib/utils';
import { useCurrentTime } from '../../hooks/useCurrentTime';
import { useTimeCompliance } from '../../hooks/useTimeCompliance';
import BreakAlert from './BreakAlert';
import WorkingHoursAlert from './WorkingHoursAlert';
import YoungWorkerAlert from './YoungWorkerAlert';

interface TimeClockCardProps {
  todayEntry?: TimeEntry;
  onClockIn: () => void;
  onClockOut: () => void;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  employeeAge?: number;
  weeklyTimeEntries?: TimeEntry[];
  breaks?: {
    startTime: string;
    endTime: string;
    type: 'REST_BREAK' | 'MEAL_BREAK';
  }[];
}

const TimeClockCard = memo(function TimeClockCard({
  todayEntry,
  onClockIn,
  onClockOut,
  location,
  employeeAge,
  weeklyTimeEntries = [],
  breaks = [],
}: TimeClockCardProps) {
  const currentTime = useCurrentTime();
  const compliance = useTimeCompliance({
    timeEntry: todayEntry,
    breaks,
    weeklyTimeEntries,
    employeeAge,
  });

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            Time Clock
          </h3>
          <span className="text-sm text-gray-500">
            {format(currentTime, 'EEEE, MMMM d')}
          </span>
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-900">
            {format(currentTime, 'HH:mm')}
          </div>
        </div>

        {location && (
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location.address}</span>
          </div>
        )}

        <div className="space-y-4">
          {!todayEntry?.clockIn ? (
            <button
              onClick={onClockIn}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clock In
            </button>
          ) : !todayEntry.clockOut ? (
            <button
              onClick={onClockOut}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clock Out
            </button>
          ) : (
            <div className="text-center text-sm text-gray-500">
              Shift completed for today
            </div>
          )}

          {todayEntry && (
            <div className="border-t border-gray-200 pt-4">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Clock In</dt>
                  <dd className="mt-1 text-sm text-gray-900">{todayEntry.clockIn}</dd>
                </div>
                {todayEntry.clockOut && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Clock Out</dt>
                    <dd className="mt-1 text-sm text-gray-900">{todayEntry.clockOut}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <BreakAlert compliance={compliance.breakCompliance} />
          <WorkingHoursAlert compliance={compliance.hoursCompliance} />
          <YoungWorkerAlert compliance={compliance.youngWorkerCompliance} />
        </div>
      </div>
    </div>
  );
});

export default TimeClockCard;