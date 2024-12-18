import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { WorkSchedule } from '../../types/attendance';
import { cn } from '../../lib/utils';

interface ShiftCalendarProps {
  schedules: WorkSchedule[];
  onDateClick?: (date: Date) => void;
  selectedDate?: Date;
  className?: string;
}

export default function ShiftCalendar({
  schedules,
  onDateClick,
  selectedDate,
  className,
}: ShiftCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            Shift Calendar
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-lg font-medium text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {weekDays.map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
          
          {days.map((day) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const schedule = schedules.find(s => s.dayOfWeek === day.getDay());

            return (
              <div
                key={day.toString()}
                onClick={() => onDateClick?.(day)}
                className={cn(
                  'min-h-[100px] bg-white p-2 cursor-pointer transition-colors',
                  !isCurrentMonth && 'bg-gray-50 text-gray-400',
                  isToday && 'ring-2 ring-indigo-500',
                  isSelected && 'bg-indigo-50',
                  'hover:bg-gray-50'
                )}
              >
                <div className="flex flex-col h-full">
                  <span className={cn(
                    'text-sm font-medium',
                    isToday ? 'text-indigo-600' : 'text-gray-900'
                  )}>
                    {format(day, 'd')}
                  </span>
                  
                  {schedule?.isWorkingDay && (
                    <div className="mt-1 space-y-1">
                      <div className={cn(
                        'text-xs px-2 py-1 rounded-full',
                        schedule.shiftType === 'NIGHT' ? 'bg-purple-100 text-purple-800' :
                        schedule.shiftType === 'FLEXIBLE' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      )}>
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      {schedule.flexibleHours && (
                        <div className="text-xs text-gray-500">
                          Core: {schedule.flexibleHours.coreStartTime} - {schedule.flexibleHours.coreEndTime}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}