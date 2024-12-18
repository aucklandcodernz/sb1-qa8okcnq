import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { AccidentReport } from '../../types/safety/accidents';
import { cn } from '../../lib/utils';

interface AccidentReportListProps {
  reports: AccidentReport[];
  onReportClick?: (reportId: string) => void;
}

const statusConfig = {
  REPORTED: {
    icon: AlertTriangle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Reported',
  },
  INVESTIGATING: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Under Investigation',
  },
  ACC_LODGED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'ACC Lodged',
  },
  CLOSED: {
    icon: XCircle,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Closed',
  },
};

const severityColors = {
  MINOR: 'bg-green-100 text-green-800',
  MODERATE: 'bg-yellow-100 text-yellow-800',
  SERIOUS: 'bg-orange-100 text-orange-800',
  CRITICAL: 'bg-red-100 text-red-800',
};

export default function AccidentReportList({ reports, onReportClick }: AccidentReportListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Accident Reports
        </h3>

        <div className="space-y-4">
          {reports.map((report) => {
            const status = statusConfig[report.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={report.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50'
                )}
                onClick={() => onReportClick?.(report.id)}
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
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2',
                          severityColors[report.severity]
                        )}>
                          {report.severity}
                        </span>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-900">
                        {report.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>
                          {format(new Date(`${report.date}T${report.time}`), 'PPp')}
                        </span>
                        <span>{report.location}</span>
                        {report.accNumber && (
                          <span>ACC: {report.accNumber}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {report.investigation && (
                  <div className="mt-2 ml-14">
                    <p className="text-sm text-gray-500">
                      Investigation by {report.investigation.assignedTo}
                      {report.investigation.completedAt && (
                        <> - Completed {format(new Date(report.investigation.completedAt), 'PP')}</>
                      )}
                    </p>
                  </div>
                )}

                {report.followUp && !report.followUp.completedAt && (
                  <div className="mt-2 ml-14">
                    <p className="text-sm text-yellow-600">
                      Follow-up actions due by {format(new Date(report.followUp.dueDate), 'PP')}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          {reports.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No accident reports found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}