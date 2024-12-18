
import React from 'react';
import { Clock, FileText } from 'lucide-react';
import { useAtom } from 'jotai';
import { timesheetsAtom } from '../../lib/timesheet';

interface TimesheetListProps {
  timesheets: any[];
}

export default function TimesheetList({ timesheets }: TimesheetListProps) {
  const statusIcons = {
    PENDING: { icon: Clock, color: 'text-yellow-500' },
    APPROVED: { icon: FileText, color: 'text-green-500' },
    REJECTED: { icon: FileText, color: 'text-red-500' }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Timesheets</h3>
      <div className="space-y-4">
        {timesheets.map((timesheet) => {
          const StatusIcon = statusIcons[timesheet.status]?.icon || Clock;
          const statusColor = statusIcons[timesheet.status]?.color || 'text-gray-500';
          
          return (
            <div key={timesheet.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <StatusIcon className={`h-5 w-5 mr-3 ${statusColor}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {timesheet.date}
                  </p>
                  <p className="text-sm text-gray-500">
                    {timesheet.hours} hours
                  </p>
                </div>
              </div>
              <span className={`text-sm ${statusColor}`}>
                {timesheet.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
