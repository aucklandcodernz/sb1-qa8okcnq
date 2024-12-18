import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Timesheet } from '../../types/timesheet';
import { cn } from '../../lib/utils';

interface TimesheetApprovalProps {
  timesheet: Timesheet;
  onApprove: (timesheetId: string, comment?: string) => void;
  onReject: (timesheetId: string, comment?: string) => void;
  onClose: () => void;
}

export default function TimesheetApproval({
  timesheet,
  onApprove,
  onReject,
  onClose,
}: TimesheetApprovalProps) {
  const [comment, setComment] = useState('');

  const handleApprove = () => {
    onApprove(timesheet.id, comment);
  };

  const handleReject = () => {
    onReject(timesheet.id, comment);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            Review Timesheet
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Period</label>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(timesheet.periodStart), 'MMMM d')} -{' '}
                {format(new Date(timesheet.periodEnd), 'MMMM d, yyyy')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Hours</label>
              <p className="mt-1 text-sm text-gray-900">
                Regular: {timesheet.totalRegularHours.toFixed(2)} |{' '}
                Overtime: {timesheet.totalOvertimeHours.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Daily Entries</h4>
            <div className="space-y-4">
              {timesheet.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {format(new Date(entry.date), 'EEEE, MMMM d')}
                    </span>
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      entry.type === 'OVERTIME' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    )}>
                      {entry.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div>Hours: {entry.startTime} - {entry.endTime}</div>
                    {entry.breaks.length > 0 && (
                      <div className="mt-1">
                        Breaks:{' '}
                        {entry.breaks.map((breakTime, index) => (
                          <span key={index}>
                            {breakTime.type === 'MEAL_BREAK' ? 'Meal' : 'Rest'}{' '}
                            ({breakTime.startTime} - {breakTime.endTime})
                            {index < entry.breaks.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                    {entry.description && (
                      <div className="mt-1">Notes: {entry.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Add any comments or feedback..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleReject}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <XCircle className="h-5 w-5 mr-2" />
              Reject
            </button>
            <button
              type="button"
              onClick={handleApprove}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}