import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { FormApproval } from '../../lib/employee/routing';
import { cn } from '../../lib/utils';

interface FormApprovalStatusProps {
  approvals: FormApproval[];
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

export default function FormApprovalStatus({
  approvals,
  className,
}: FormApprovalStatusProps) {
  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Approval Status
        </h3>

        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {approvals.map((approval) => {
              const status = statusConfig[approval.status];
              const StatusIcon = status.icon;

              return (
                <li key={approval.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      status.bgColor
                    )}>
                      <StatusIcon className={cn('h-6 w-6', status.color)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {approval.approverRole.replace('_', ' ')}
                      </p>
                      {approval.actionDate && (
                        <p className="text-sm text-gray-500">
                          {format(new Date(approval.actionDate), 'MMM d, yyyy HH:mm')}
                        </p>
                      )}
                      {approval.comments && (
                        <p className="mt-1 text-sm text-gray-500">
                          {approval.comments}
                        </p>
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
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}