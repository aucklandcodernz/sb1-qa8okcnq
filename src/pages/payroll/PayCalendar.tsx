import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function PayCalendar() {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Mock pay events - in a real app, this would come from your state management
  const payEvents = [
    { date: '2024-03-15', type: 'PAY_DAY', description: 'Regular Pay Day' },
    { date: '2024-03-31', type: 'FILING_DUE', description: 'Monthly Filing Due' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Pay Calendar</h3>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
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
              const isToday = isSameDay(day, currentDate);
              const dateStr = format(day, 'yyyy-MM-dd');
              const events = payEvents.filter(event => event.date === dateStr);

              return (
                <div
                  key={day.toString()}
                  className={cn(
                    'min-h-[100px] bg-white p-2',
                    !isCurrentMonth && 'bg-gray-50 text-gray-400',
                    isToday && 'ring-2 ring-indigo-500'
                  )}
                >
                  <span className={cn(
                    'text-sm font-medium',
                    isToday ? 'text-indigo-600' : 'text-gray-900'
                  )}>
                    {format(day, 'd')}
                  </span>

                  {events.map((event, index) => (
                    <div
                      key={index}
                      className={cn(
                        'mt-1 px-2 py-1 text-xs rounded-full',
                        event.type === 'PAY_DAY' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      )}
                    >
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.description}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}