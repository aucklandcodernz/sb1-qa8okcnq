import React from 'react';
import { format } from 'date-fns';
import { Scale, Clock, CheckCircle, XCircle } from 'lucide-react';
import { DisciplinaryCase } from '../../types/disciplinary';
import { cn } from '../../lib/utils';

interface AppealListProps {
  appeals: DisciplinaryCase[];
  onAppealClick?: (caseId: string) => void;
}

const statusConfig = {
  PENDING: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending Review',
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

export default function AppealList({ appeals, onAppealClick }: AppealListProps) {
  const filteredAppeals = appeals.filter(case_ => case_.appeal);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Scale className="h-5 w-5 mr-2 text-gray-400" />
          Appeals
        </h3>

        <div className="space-y-4">
          {filteredAppeals.map((case_) => {
            const appeal = case_.appeal!;
            const status = statusConfig[appeal.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={case_.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50'
                )}
                onClick={() => onAppealClick?.(case_.id)}
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
                          Appeal for {case_.type.replace('_', ' ')}
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
                        {appeal.reason.length > 100
                          ? `${appeal.reason.substring(0, 100)}...`
                          : appeal.reason}
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>
                          Filed on: {format(new Date(appeal.date), 'MMM d, yyyy')}
                        </span>
                        {appeal.decisionDate && (
                          <span>
                            Decision: {format(new Date(appeal.decisionDate), 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredAppeals.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No appeals found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}