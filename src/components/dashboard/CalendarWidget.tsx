import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Event {
  id: string;
  date: string;
  title: string;
  type: 'LEAVE' | 'MEETING' | 'TRAINING' | 'DEADLINE';
}

interface CalendarWidgetProps {
  events?: Event[];
  className?: string;
}

export default function CalendarWidget({ events = [], className }: CalendarWidgetProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventType = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const event = events.find(e => e.date === dateStr);
    return event?.type;
  };

  return (
    <div className={cn('bg-white rounded-lg shadow-sm', className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
            {format(today, 'MMMM yyyy')}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {weekDays.map(day => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
          
          {days.map(day => {
            const isCurrentMonth = isSameMonth(day, today);
            const isToday = isSameDay(day, today);
            const eventType = getEventType(day);

            return (
              <div
                key={day.toString()}
                className={cn(
                  'h-12 bg-white p-1',
                  !isCurrentMonth && 'bg-gray-50 text-gray-400',
                  isToday && 'ring-2 ring-indigo-500'
                )}
              >
                <button
                  className={cn(
                    'w-full h-full flex flex-col items-center justify-center rounded-lg',
                    eventType === 'LEAVE' && 'bg-green-50 text-green-700',
                    eventType === 'MEETING' && 'bg-blue-50 text-blue-700',
                    eventType === 'TRAINING' && 'bg-purple-50 text-purple-700',
                    eventType === 'DEADLINE' && 'bg-red-50 text-red-700',
                    'hover:bg-gray-100 transition-colors'
                  )}
                >
                  <span className={cn(
                    'text-sm',
                    isToday ? 'font-bold text-indigo-600' : 'font-medium text-gray-900'
                  )}>
                    {format(day, 'd')}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}