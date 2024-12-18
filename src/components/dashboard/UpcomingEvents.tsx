
import React from 'react';
import { format } from 'date-fns';
import { Event } from '../../types/event';

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
        <p className="text-gray-500 mt-2">No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
      <div className="mt-4 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-sm">
                  {format(new Date(event.startTime), 'd')}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-900">{event.title}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(event.startTime), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
