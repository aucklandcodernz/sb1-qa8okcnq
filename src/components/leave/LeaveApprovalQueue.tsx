import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle, XCircle, User } from 'lucide-react';
import { LeaveRequest } from '../../types/leave';
import { cn } from '../../lib/utils';

interface LeaveApprovalQueueProps {
  requests: LeaveRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  className?: string;
}

export default function LeaveApprovalQueue({
  requests,
  onApprove,
  onReject,
  className,
}: LeaveApprovalQueueProps) {
  const pendingRequests = requests.filter(request => request.status === 'PENDING');

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Pending Leave Requests
        </h3>

        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 rounded-lg bg-yellow-50 border border-yellow-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-10 w-10 text-gray-400" />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {request.type} Leave Request
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {format(request.startDate, 'MMM d')} - {format(request.endDate, 'MMM d, yyyy')}
                    </div>
                    {request.reason && (
                      <p className="mt-1 text-sm text-gray-600">
                        {request.reason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onReject(request.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                  <button
                    onClick={() => onApprove(request.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
          {pendingRequests.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No pending leave requests
            </p>
          )}
        </div>
      </div>
    </div>
  );
}