import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Event {
  id: string;
  title: string;
  type: 'MEETING' | 'TRAINING' | 'REVIEW' | 'DEADLINE';
  startTime: string;
  endTime?: string;
  location?: string;
  isVirtual?: boolean;
  category?: string;
}

interface UpcomingEventsProps {
  events: Event[];
  className?: string;
}

const eventTypeConfig = {
  MEETING: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  TRAINING: {
    icon: Calendar,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  REVIEW: {
    icon: Clock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  DEADLINE: {
    icon: Clock,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
};

export default function UpcomingEvents({ events, className }: UpcomingEventsProps) {
  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className={cn('bg-white rounded-lg shadow-sm', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {sortedEvents.map((event) => {
            const config = eventTypeConfig[event.type];
            const EventIcon = config.icon;
            const startDate = new Date(event.startTime);
            const endDate = event.endTime ? new Date(event.endTime) : null;

            return (
              <div
                key={event.id}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
              >
                <div className={cn(
                  'flex-shrink-0 p-2 rounded-lg',
                  config.bgColor
                )}>
                  <EventIcon className={cn('h-5 w-5', config.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {event.title}
                  </p>
                  <div className="mt-1 text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(startDate, 'h:mm a')}
                      {endDate && ` - ${format(endDate, 'h:mm a')}`}
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        {event.isVirtual ? (
                          <Video className="h-4 w-4 mr-1" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1" />
                        )}
                        {event.location}
                      </div>
                    )}
                  </div>
                  {event.category && (
                    <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {event.category}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {events.length === 0 && (
            <div className="text-center py-6">
              <Calendar className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">No upcoming events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}