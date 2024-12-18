import React, { useState, useEffect } from 'react';
import { Event } from '../../types/event';
import { format } from 'date-fns';

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-3 border-b border-gray-100 pb-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{event.title}</p>
              <p className="mt-1 text-xs text-gray-500">
                {format(new Date(event.startTime), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              event.type === 'MEETING' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {event.type}
            </span>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-sm text-gray-500">No upcoming events</p>
        )}
      </div>
    </div>
  );
}


function OrgAdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Replace with actual data fetching logic
    const mockEvents = [
      {
        id: '1',
        title: 'Team Meeting',
        startTime: new Date().toISOString(),
        type: 'MEETING'
      },
      {
        id: '2',
        title: 'Performance Reviews',
        startTime: new Date(Date.now() + 86400000).toISOString(),
        type: 'REVIEW'
      },
      {
        id: '3',
        title: 'Training Workshop',
        startTime: new Date(Date.now() + 172800000).toISOString(),
        type: 'TRAINING'
      }
    ];
    setEvents(mockEvents);
  }, []);

  return (
    <div>
      <UpcomingEvents events={events} />
    </div>
  );
}

export default OrgAdminDashboard;