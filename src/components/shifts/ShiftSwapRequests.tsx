```typescript
import React from 'react';
import { format } from 'date-fns';
import { ArrowLeftRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { ShiftSwapRequest } from '../../types/attendance';
import { cn } from '../../lib/utils';

interface ShiftSwapRequestsProps {
  employeeId: string;
  className?: string;
}

const statusConfig = {
  PENDING: {
    icon: Clock,
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

export default function ShiftSwapRequests({
  employeeId,
  className,
}: ShiftSwapRequestsProps) {
  // Mock data - in a real app, this would come from your state management
  const requests: ShiftSwapRequest[] = [];

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <ArrowLeftRight className="h-5 w-5 mr-2 text-gray-400" />
          Shift Swap Requests
        </h3>

        <div className="space-y-4">
          {requests.map((request) => {
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
                  <div>
                    <div className="flex items-center">
                      <StatusIcon className={cn('h-5 w-5 mr-2', status.color)} />
                      <span className="text-sm font-medium text-gray-900">
                        Shift on {format(new Date(request.shiftDate), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    {request.notes && (
                      <p className="mt-1 text-sm text-gray-500">{request.notes}</p>
                    )}
                  </div>
                  <span className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    status.bgColor,
                    status.color
                  )}>
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
          {requests.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No shift swap requests
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```