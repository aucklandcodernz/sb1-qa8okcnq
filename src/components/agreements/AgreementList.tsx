import React from 'react';
import { format } from 'date-fns';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { EmploymentAgreement } from '../../types/agreements';
import { cn } from '../../lib/utils';

interface AgreementListProps {
  agreements: EmploymentAgreement[];
  onAgreementClick?: (agreementId: string) => void;
}

const statusConfig = {
  DRAFT: {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Draft',
  },
  PENDING_SIGNATURE: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending Signature',
  },
  SIGNED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Signed',
  },
  EXPIRED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Expired',
  },
  TERMINATED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Terminated',
  },
};

export default function AgreementList({ agreements, onAgreementClick }: AgreementListProps) {
  const sortedAgreements = [...agreements].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <FileText className="h-5 w-5 mr-2 text-gray-400" />
          Employment Agreements
        </h3>

        <div className="space-y-4">
          {sortedAgreements.map((agreement) => {
            const status = statusConfig[agreement.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={agreement.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50'
                )}
                onClick={() => onAgreementClick?.(agreement.id)}
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
                        <h4 className="text-sm font-medium text-gray-900">
                          {agreement.position}
                        </h4>
                        <span className={cn(
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {agreement.type.replace('_', ' ')} - {agreement.department}
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>
                          Start Date: {format(new Date(agreement.startDate), 'MMM d, yyyy')}
                        </span>
                        {agreement.endDate && (
                          <span>
                            End Date: {format(new Date(agreement.endDate), 'MMM d, yyyy')}
                          </span>
                        )}
                        <span>
                          Version {agreement.version}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {agreements.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No agreements found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}