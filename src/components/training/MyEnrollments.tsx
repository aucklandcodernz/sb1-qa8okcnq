import React from 'react';
import { format } from 'date-fns';
import { BookOpen, Clock, CheckCircle, Award } from 'lucide-react';
import { CourseEnrollment } from '../../types/training';
import { cn } from '../../lib/utils';

interface MyEnrollmentsProps {
  enrollments: CourseEnrollment[];
}

const statusConfig = {
  ENROLLED: {
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Enrolled',
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
  DROPPED: {
    icon: Award,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Dropped',
  },
};

export default function MyEnrollments({ enrollments }: MyEnrollmentsProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <BookOpen className="h-5 w-5 mr-2 text-gray-400" />
          My Enrollments
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {enrollments.map((enrollment) => {
              const status = statusConfig[enrollment.status];
              const StatusIcon = status.icon;
              
              return (
                <li key={enrollment.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        status.bgColor
                      )}>
                        <StatusIcon className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Course ID: {enrollment.courseId}
                        </p>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Started {format(new Date(enrollment.startDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 rounded-full h-2"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {enrollment.progress}%
                          </span>
                        </div>
                      </div>
                      {enrollment.assessmentScores.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Latest Score: {enrollment.assessmentScores[enrollment.assessmentScores.length - 1].score}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
            {enrollments.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No active enrollments
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}