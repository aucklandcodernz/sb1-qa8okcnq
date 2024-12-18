import React from 'react';
import { format } from 'date-fns';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Timesheet } from '../../types/timesheet';
import { cn } from '../../lib/utils';

interface TimesheetListProps {
  timesheets: Timesheet[];
  onTimesheetClick?: (timesheetId: string) => void;
}

const statusConfig = {
  DRAFT: {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Draft',
  },
  SUBMITTED: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Submitted',
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

export default function TimesheetList({ timesheets, onTimesheetClick }: TimesheetListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          Timesheets
        </h3>

        <div className="space-y-4">
          {timesheets.map((timesheet) => {
            const status = statusConfig[timesheet.status];
            const StatusIcon = status.icon;
            
            return (
              <div
                key={timesheet.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50'
                )}
                onClick={() => onTimesheetClick?.(timesheet.id)}
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
                        <p className="text-sm font-medium text-gray-900">
                          {format(new Date(timesheet.periodStart), 'MMMM d')} -{' '}
                          {format(new Date(timesheet.periodEnd), 'MMMM d, yyyy')}
                        </p>
                        <span className={cn(
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Regular Hours: {timesheet.totalRegularHours.toFixed(2)} |{' '}
                          Overtime: {timesheet.totalOvertimeHours.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {timesheets.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No timesheets found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}