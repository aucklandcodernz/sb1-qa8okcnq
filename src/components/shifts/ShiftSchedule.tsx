```typescript
import React from 'react';
import { useAtom } from 'jotai';
import { workSchedulesAtom } from '../../lib/attendance';
import { Clock, Calendar, ArrowLeftRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ShiftScheduleProps {
  employeeId: string;
  onShiftSwapRequest?: (scheduleId: string) => void;
  className?: string;
}

const shiftTypeConfig = {
  REGULAR: { color: 'text-blue-500', bgColor: 'bg-blue-50' },
  NIGHT: { color: 'text-purple-500', bgColor: 'bg-purple-50' },
  FLEXIBLE: { color: 'text-green-500', bgColor: 'bg-green-50' },
  CUSTOM: { color: 'text-orange-500', bgColor: 'bg-orange-50' },
};

export default function ShiftSchedule({
  employeeId,
  onShiftSwapRequest,
  className,
}: ShiftScheduleProps) {
  const [workSchedules] = useAtom(workSchedulesAtom);
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const employeeSchedules = workSchedules.filter(
    schedule => schedule.employeeId === employeeId
  );

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          Weekly Schedule
        </h3>

        <div className="space-y-4">
          {weekDays.map((day, index) => {
            const schedule = employeeSchedules.find(s => s.dayOfWeek === index);
            
            return (
              <div
                key={day}
                className={cn(
                  'p-4 rounded-lg border',
                  schedule?.isWorkingDay
                    ? 'border-gray-200'
                    : 'border-gray-100 bg-gray-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">
                      {day}
                    </span>
                    {schedule?.isWorkingDay && schedule.shiftType && (
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        shiftTypeConfig[schedule.shiftType].bgColor,
                        shiftTypeConfig[schedule.shiftType].color
                      )}>
                        {schedule.shiftType}
                      </span>
                    )}
                  </div>
                  
                  {schedule?.isWorkingDay && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      {onShiftSwapRequest && (
                        <button
                          onClick={() => onShiftSwapRequest(schedule.id)}
                          className="p-2 text-gray-400 hover:text-gray-500"
                          title="Request shift swap"
                        >
                          <ArrowLeftRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {schedule?.flexibleHours && (
                  <div className="mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Core hours:</span>
                      {schedule.flexibleHours.coreStartTime} - {schedule.flexibleHours.coreEndTime}
                      <span className="ml-4">
                        (Min: {schedule.flexibleHours.minHours}h)
                      </span>
                    </div>
                  </div>
                )}

                {schedule?.breakDuration && (
                  <div className="mt-1 text-sm text-gray-500">
                    Break duration: {schedule.breakDuration} minutes
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```