import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Video, MapPin, Phone, Users } from 'lucide-react';
import { Meeting } from '../../types/meetings';
import { cn } from '../../lib/utils';

interface MeetingListProps {
  meetings: Meeting[];
  onMeetingClick?: (meetingId: string) => void;
}

const locationIcons = {
  IN_PERSON: MapPin,
  VIDEO: Video,
  PHONE: Phone,
};

const statusConfig = {
  SCHEDULED: {
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Scheduled',
  },
  IN_PROGRESS: {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'In Progress',
  },
  COMPLETED: {
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
  CANCELLED: {
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Cancelled',
  },
};

export default function MeetingList({ meetings, onMeetingClick }: MeetingListProps) {
  const sortedMeetings = [...meetings].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Meetings
        </h3>

        <div className="space-y-4">
          {sortedMeetings.map((meeting) => {
            const LocationIcon = locationIcons[meeting.location];
            const status = statusConfig[meeting.status];
            const acceptedAttendees = meeting.attendees.filter(
              a => a.status === 'ACCEPTED'
            ).length;

            return (
              <div
                key={meeting.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50'
                )}
                onClick={() => onMeetingClick?.(meeting.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      status.bgColor
                    )}>
                      <LocationIcon className={cn('h-6 w-6', status.color)} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">
                          {meeting.title}
                        </h4>
                        <span className={cn(
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {format(new Date(meeting.startDate), 'MMM d, HH:mm')} -{' '}
                          {format(new Date(meeting.endDate), 'HH:mm')}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {acceptedAttendees}/{meeting.attendees.length} attending
                        </div>
                      </div>
                      {meeting.locationDetails && (
                        <div className="mt-1 text-sm text-gray-500">
                          {meeting.location === 'IN_PERSON' && meeting.locationDetails.room && (
                            <span>Room: {meeting.locationDetails.room}</span>
                          )}
                          {meeting.location === 'VIDEO' && meeting.locationDetails.videoLink && (
                            <a
                              href={meeting.locationDetails.videoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Join Meeting
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {meetings.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No meetings found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}