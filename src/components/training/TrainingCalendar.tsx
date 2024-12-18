import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Video, Users } from 'lucide-react';
import { trainingSessionsAtom } from '../../lib/training';
import { cn } from '../../lib/utils';

export default function TrainingCalendar() {
  const [trainingSessions] = useAtom(trainingSessionsAtom);

  const upcomingSessions = trainingSessions
    .filter(session => new Date(session.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Upcoming Sessions
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {upcomingSessions.map((session) => (
              <li key={session.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      session.type === 'ONLINE' ? 'bg-blue-50' : 'bg-green-50'
                    )}>
                      {session.type === 'ONLINE' ? (
                        <Video className="h-6 w-6 text-blue-600" />
                      ) : (
                        <MapPin className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        Course ID: {session.courseId}
                      </p>
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        session.type === 'ONLINE'
                          ? 'bg-blue-50 text-blue-800'
                          : session.type === 'HYBRID'
                          ? 'bg-purple-50 text-purple-800'
                          : 'bg-green-50 text-green-800'
                      )}>
                        {session.type}
                      </span>
                    </div>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {format(new Date(session.startDate), 'MMM d, yyyy HH:mm')} -{' '}
                        {format(new Date(session.endDate), 'HH:mm')}
                      </div>
                      {session.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {session.location.name}
                          {session.location.room && ` - ${session.location.room}`}
                        </div>
                      )}
                      {session.virtualMeetingUrl && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Video className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <a
                            href={session.virtualMeetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Join Meeting
                          </a>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {session.enrolledParticipants.length} / {session.capacity} enrolled
                      </div>
                    </div>
                  </div>
                  {session.enrolledParticipants.length < session.capacity && (
                    <div>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Enroll
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
            {upcomingSessions.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No upcoming training sessions
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}