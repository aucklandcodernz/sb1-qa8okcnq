import React from 'react';
import { format } from 'date-fns';
import { User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { JobApplication } from '../../types/recruitment';
import { cn } from '../../lib/utils';

interface ApplicationsListProps {
  applications: JobApplication[];
}

const statusConfig = {
  NEW: {
    icon: AlertCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'New',
  },
  SCREENING: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Screening',
  },
  INTERVIEW: {
    icon: User,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    label: 'Interview',
  },
  OFFER: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Offer',
  },
  HIRED: {
    icon: CheckCircle,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    label: 'Hired',
  },
  REJECTED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Rejected',
  },
};

export default function ApplicationsList({ applications }: ApplicationsListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <User className="h-5 w-5 mr-2 text-gray-400" />
          Applications
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {applications.map((application) => {
              const status = statusConfig[application.status];
              const StatusIcon = status.icon;
              
              return (
                <li key={application.id} className="py-4">
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
                          {application.candidate.firstName} {application.candidate.lastName}
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
                          Applied {format(new Date(application.appliedAt), 'MMM d, yyyy')}
                        </div>
                      </div>
                      {application.interviews.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Next Interview: {format(new Date(application.interviews[0].scheduledAt), 'MMM d, yyyy HH:mm')}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View Details
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
            {applications.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No applications found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}