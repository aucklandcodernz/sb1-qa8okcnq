import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { ReviewSchedule } from '../../types/performance';
import { cn } from '../../lib/utils';

interface ReviewScheduleListProps {
  schedules: ReviewSchedule[];
  onScheduleClick?: (scheduleId: string) => void;
}

const statusConfig = {
  SCHEDULED: {
    icon: Calendar,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Scheduled',
  },
  IN_PROGRESS: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'In Progress',
  },
  COMPLETED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
};

export default function ReviewScheduleList({ schedules, onScheduleClick }: ReviewScheduleListProps) {
  const sortedSchedules = [...schedules].sort(
    (a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime()
  );

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Review Schedule
        </h3>

        <div className="space-y-4">
          {sortedSchedules.map((schedule) => {
            const status = statusConfig[schedule.status];
            const StatusIcon = status.icon;
            const isOverdue = new Date(schedule.nextReviewDate) < new Date();

            return (
              <div
                key={schedule.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
                )}
                onClick={() => onScheduleClick?.(schedule.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      isOverdue ? 'bg-red-100' : status.bgColor
                    )}>
                      {isOverdue ? (
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      ) : (
                        <StatusIcon className={cn('h-6 w-6', status.color)} />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">
                          {schedule.type} Review
                        </h4>
                        <span className={cn(
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          isOverdue ? 'bg-red-100 text-red-800' : status.bgColor + ' ' + status.color
                        )}>
                          {isOverdue ? 'Overdue' : status.label}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Next Review: {format(new Date(schedule.nextReviewDate), 'MMM d, yyyy')}
                        </div>
                        {schedule.lastReviewDate && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Last Review: {format(new Date(schedule.lastReviewDate), 'MMM d, yyyy')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {schedule.notificationsSent.length > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    Last notification: {format(
                      new Date(schedule.notificationsSent[schedule.notificationsSent.length - 1].sentAt),
                      'MMM d, yyyy'
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {schedules.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No review schedules found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}