import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { CheckCircle, XCircle, User } from 'lucide-react';
import { LeaveRequest } from '../../types/leave';
import { leaveRequestsAtom } from '../../lib/leave';
import { userAtom } from '../../lib/auth';
import { cn } from '../../lib/utils';

interface LeaveApprovalListProps {
  organizationId: string;
}

export default function LeaveApprovalList({ organizationId }: LeaveApprovalListProps) {
  const [leaveRequests, setLeaveRequests] = useAtom(leaveRequestsAtom);
  const [user] = useAtom(userAtom);

  const pendingRequests = leaveRequests.filter(
    request => request.status === 'PENDING'
  );

  const handleApprove = (requestId: string) => {
    setLeaveRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'APPROVED',
              approvedBy: user?.id,
              approvedAt: new Date(),
              updatedAt: new Date(),
            }
          : request
      )
    );
  };

  const handleReject = (requestId: string) => {
    setLeaveRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'REJECTED',
              updatedAt: new Date(),
            }
          : request
      )
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Approvals</h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {pendingRequests.map((request) => (
              <li key={request.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <div className="flex-shrink-0">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {request.employeeName || 'Unknown Employee'} - {request.type} Leave Request
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        {format(new Date(request.startDate), 'MMM d')} -{' '}
                        {format(new Date(request.endDate), 'MMM d, yyyy')}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{request.reason}</p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className={cn(
                        "inline-flex items-center px-3 py-2 border border-transparent",
                        "text-sm leading-4 font-medium rounded-md shadow-sm",
                        "text-white bg-green-600 hover:bg-green-700",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      )}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className={cn(
                        "inline-flex items-center px-3 py-2 border border-transparent",
                        "text-sm leading-4 font-medium rounded-md shadow-sm",
                        "text-white bg-red-600 hover:bg-red-700",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      )}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {pendingRequests.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No pending leave requests to approve
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}