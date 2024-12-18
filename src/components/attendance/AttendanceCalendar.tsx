import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { timeEntriesAtom } from '../../lib/attendance';
import { cn } from '../../lib/utils';

interface AttendanceCalendarProps {
  employeeId?: string;
}

const statusConfig = {
  PRESENT: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Present',
  },
  ABSENT: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Absent',
  },
  LATE: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Late',
  },
  HALF_DAY: {
    icon: Clock,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    label: 'Half Day',
  },
};

export default function AttendanceCalendar({ employeeId }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeEntries] = useAtom(timeEntriesAtom);

  if (!employeeId) return null;

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAttendanceForDay = (date: Date) => {
    return timeEntries.find(
      entry => 
        entry.employeeId === employeeId && 
        entry.date === format(date, 'yyyy-MM-dd')
    );
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            Monthly Attendance
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
            const attendance = getAttendanceForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const status = attendance ? statusConfig[attendance.status] : null;

            return (
              <div
                key={day.toString()}
                className={cn(
                  'min-h-[100px] bg-white p-2',
                  !isCurrentMonth && 'bg-gray-50 text-gray-400',
                  isToday && 'ring-2 ring-indigo-500'
                )}
              >
                <div className="flex flex-col h-full">
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isToday ? 'text-indigo-600' : 'text-gray-900'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  
                  {attendance && (
                    <div className="mt-2 space-y-1">
                      <div className={cn(
                        'text-xs px-2 py-1 rounded-full flex items-center',
                        status?.bgColor,
                        status?.color
                      )}>
                        {status?.icon && (
                          <status.icon className="h-3 w-3 mr-1" />
                        )}
                        {status?.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {attendance.clockIn} - {attendance.clockOut || 'Active'}
                      </div>
                      {attendance.overtime && attendance.overtime > 0 && (
                        <div className="text-xs text-blue-600">
                          OT: {Math.round(attendance.overtime / 60)}h
                        </div>
                      )}
                      {attendance.location && (
                        <div className="text-xs text-gray-400 truncate">
                          {attendance.location.address}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <div className="flex space-x-4">
            {Object.entries(statusConfig).map(([key, value]) => (
              <div key={key} className="flex items-center text-sm">
                <div className={cn(
                  'h-3 w-3 rounded-full mr-1',
                  value.bgColor,
                  value.color
                )} />
                <span className="text-gray-600">{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}