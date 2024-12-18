import React from 'react';
import { format } from 'date-fns';
import { Clock, CheckCircle, XCircle, Calendar, MessageSquare } from 'lucide-react';
import { JobApplication } from '../../types/recruitment';
import { cn } from '../../lib/utils';

interface ApplicationTimelineProps {
  application: JobApplication;
}

export default function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  // Create timeline events from application history
  const events = [
    {
      id: 1,
      type: 'APPLIED',
      date: application.appliedAt,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      content: 'Application submitted',
    },
    ...application.notes.map((note, index) => ({
      id: `note-${index}`,
      type: 'NOTE',
      date: note.createdAt,
      icon: MessageSquare,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      content: note.content,
    })),
    ...application.interviews.map((interview, index) => ({
      id: `interview-${index}`,
      type: 'INTERVIEW',
      date: interview.scheduledAt,
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      content: `${interview.type} Interview scheduled`,
      status: interview.status,
      feedback: interview.feedback,
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => {
          const Icon = event.icon;
          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                      event.bgColor
                    )}>
                      <Icon className={cn('h-5 w-5', event.color)} />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {event.content}
                        {event.type === 'INTERVIEW' && event.feedback && (
                          <span className="ml-2 text-sm">
                            (Rating: {event.feedback.rating}/5)
                          </span>
                        )}
                      </p>
                      {event.type === 'INTERVIEW' && event.feedback && (
                        <p className="mt-1 text-sm text-gray-500">
                          Recommendation: {event.feedback.recommendation}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {format(new Date(event.date), 'MMM d, yyyy HH:mm')}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}