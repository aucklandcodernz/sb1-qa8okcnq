
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { LeaveRequest } from '../../types/leave';
import { cn } from '../../lib/utils';

interface LeaveHistoryProps {
  requests: LeaveRequest[];
  className?: string;
  showSearch?: boolean;
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

export default function LeaveHistory({ requests, className, showSearch = false }: LeaveHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredRequests = requests.filter(request => 
    !searchTerm || 
    request.employeeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Leave History
        </h3>

        {showSearch && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by employee name..."
              className="w-full px-3 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const status = statusConfig[request.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={request.id}
                className={cn(
                  'p-4 rounded-lg border',
                  request.status === 'PENDING' ? 'border-yellow-200 bg-yellow-50' :
                  request.status === 'APPROVED' ? 'border-green-200 bg-green-50' :
                  'border-red-200 bg-red-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      status.bgColor
                    )}>
                      <StatusIcon className={cn('h-6 w-6', status.color)} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {request.employeeName || 'Unknown Employee'} - {request.type} Leave
                        </span>
                        <span className={cn(
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {format(new Date(request.startDate), 'MMM d')} - {format(new Date(request.endDate), 'MMM d, yyyy')}
                      </div>
                      {request.reason && (
                        <p className="mt-1 text-sm text-gray-600">
                          {request.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Submitted on {format(new Date(request.createdAt), 'MMM d, yyyy')}</p>
                    {request.approvedAt && (
                      <p className="mt-1">
                        Approved on {format(new Date(request.approvedAt), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredRequests.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No leave requests found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
