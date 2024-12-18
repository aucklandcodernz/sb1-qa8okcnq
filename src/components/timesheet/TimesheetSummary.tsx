import React from 'react';
import { format } from 'date-fns';
import { Clock, Calendar, Briefcase } from 'lucide-react';
import { TimesheetSummary as TimesheetSummaryType } from '../../types/timesheet';
import { cn } from '../../lib/utils';

interface TimesheetSummaryProps {
  summary: TimesheetSummaryType;
  className?: string;
}

export default function TimesheetSummary({ summary, className }: TimesheetSummaryProps) {
  const stats = [
    {
      name: 'Total Days',
      value: summary.totalDays,
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Regular Hours',
      value: summary.regularHours.toFixed(2),
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Overtime Hours',
      value: summary.overtimeHours.toFixed(2),
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Summary for {format(new Date(summary.period.start), 'MMMM yyyy')}
        </h3>

        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden border border-gray-200"
              >
                <dt>
                  <div className={cn('absolute rounded-md p-3', stat.bgColor)}>
                    <Icon className={cn('h-6 w-6', stat.color)} />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>

        {summary.projects && summary.projects.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 flex items-center mb-4">
              <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
              Project Breakdown
            </h4>
            <div className="space-y-4">
              {summary.projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {project.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {project.hours.toFixed(2)} hours
                    </span>
                  </div>
                  <div className="mt-2 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${(project.hours / summary.totalHours) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}