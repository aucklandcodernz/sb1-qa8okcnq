import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { LeaveRequest } from '../../types/leave';
import { cn } from '../../lib/utils';

interface LeaveRequestListProps {
  requests: LeaveRequest[];
}

const statusConfig = {
  PENDING: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending',
  },
  APPROVED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Approved',
  },
  REJECTED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Rejected',
  },
};

export default function LeaveRequestList({ requests }: LeaveRequestListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Requests</h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {requests.map((request) => {
              const status = statusConfig[request.status];
              const StatusIcon = status.icon;
              
              return (
                <li key={request.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', status.bgColor)}>
                        <StatusIcon className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {request.type} Leave
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {format(new Date(request.startDate), 'MMM d')} -{' '}
                        {format(new Date(request.endDate), 'MMM d, yyyy')}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        Submitted on {format(new Date(request.createdAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                    <div>
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        status.bgColor,
                        status.color
                      )}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  {request.reason && (
                    <div className="mt-2 text-sm text-gray-500 ml-14">
                      {request.reason}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}