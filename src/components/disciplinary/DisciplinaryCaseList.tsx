import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Clock, CheckCircle, Scale } from 'lucide-react';
import { DisciplinaryCase } from '../../types/disciplinary';
import { cn } from '../../lib/utils';

interface DisciplinaryCaseListProps {
  cases: DisciplinaryCase[];
  onCaseClick?: (caseId: string) => void;
}

const statusConfig = {
  PENDING: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending',
  },
  IN_PROGRESS: {
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    label: 'In Progress',
  },
  RESOLVED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Resolved',
  },
  APPEALED: {
    icon: Scale,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Appealed',
  },
};

export default function DisciplinaryCaseList({ cases, onCaseClick }: DisciplinaryCaseListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Disciplinary Cases
        </h3>

        <div className="space-y-4">
          {cases.map((case_) => {
            const status = statusConfig[case_.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={case_.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50',
                  case_.confidentialityLevel === 'HIGH' && 'border-red-200',
                  case_.confidentialityLevel === 'MEDIUM' && 'border-yellow-200',
                  case_.confidentialityLevel === 'LOW' && 'border-gray-200'
                )}
                onClick={() => onCaseClick?.(case_.id)}
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
                          {case_.type.replace('_', ' ')}
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
                        {case_.description.length > 100
                          ? `${case_.description.substring(0, 100)}...`
                          : case_.description}
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <div>
                          Issue Date: {format(new Date(case_.issueDate), 'MMM d, yyyy')}
                        </div>
                        {case_.outcome && (
                          <div>
                            Outcome: {case_.outcome.decision.replace('_', ' ')}
                          </div>
                        )}
                        {case_.warnings.length > 0 && (
                          <div>
                            Warnings: {case_.warnings.length}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {cases.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No disciplinary cases found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}