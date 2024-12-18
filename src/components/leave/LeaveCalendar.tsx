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
  subMonths,
  isWeekend
} from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { leaveRequestsAtom } from '../../lib/leave';
import { cn } from '../../lib/utils';

interface LeaveCalendarProps {
  teamView?: boolean;
  departmentId?: string;
  onDateClick?: (date: Date) => void;
  className?: string;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

export default function LeaveCalendar({
  teamView = false,
  departmentId,
  onDateClick,
  className,
}: LeaveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [leaveRequests] = useAtom(leaveRequestsAtom);

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

  const getLeaveRequestsForDay = (date: Date) => {
    return leaveRequests.filter(request => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const getTotalLeavesForDay = (date: Date) => {
    const requests = getLeaveRequestsForDay(date);
    return {
      total: requests.length,
      approved: requests.filter(r => r.status === 'APPROVED').length,
      pending: requests.filter(r => r.status === 'PENDING').length,
    };
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            {teamView ? 'Team Leave Calendar' : 'Leave Calendar'}
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
            const isWeekendDay = isWeekend(day);
            const leaves = getTotalLeavesForDay(day);

            return (
              <div
                key={day.toString()}
                onClick={() => onDateClick?.(day)}
                className={cn(
                  'min-h-[100px] bg-white p-2 cursor-pointer transition-colors',
                  !isCurrentMonth && 'bg-gray-50 text-gray-400',
                  isToday && 'ring-2 ring-indigo-500',
                  isWeekendDay && 'bg-gray-50',
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
                  
                  {leaves.total > 0 && (
                    <div className="mt-1 space-y-1">
                      {leaves.approved > 0 && (
                        <div className="flex items-center text-xs">
                          <Users className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-700">{leaves.approved} approved</span>
                        </div>
                      )}
                      {leaves.pending > 0 && (
                        <div className="flex items-center text-xs">
                          <Users className="h-3 w-3 mr-1 text-yellow-500" />
                          <span className="text-yellow-700">{leaves.pending} pending</span>
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
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center text-sm">
                <div className={cn('h-3 w-3 rounded-full mr-1', color.split(' ')[0])} />
                <span className="text-gray-600">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}