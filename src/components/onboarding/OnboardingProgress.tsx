import React from 'react';
import { format } from 'date-fns';
import { CheckSquare, User, Calendar, Clock } from 'lucide-react';
import { OnboardingChecklist } from '../../types/onboarding';
import { cn } from '../../lib/utils';

interface OnboardingProgressProps {
  checklist: OnboardingChecklist;
}

export default function OnboardingProgress({ checklist }: OnboardingProgressProps) {
  const stats = [
    {
      name: 'Total Tasks',
      value: checklist.tasks.length,
      icon: CheckSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Completed Tasks',
      value: checklist.tasks.filter(t => t.status === 'COMPLETED').length,
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'In Progress',
      value: checklist.tasks.filter(t => t.status === 'IN_PROGRESS').length,
      icon: Calendar,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Progress',
      value: `${Math.round(checklist.progress)}%`,
      icon: User,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <CheckSquare className="h-5 w-5 mr-2 text-gray-400" />
          Onboarding Progress
        </h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
        </div>

        <div className="mt-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Overall Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {Math.round(checklist.progress)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div
                style={{ width: `${checklist.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              />
            </div>
          </div>
        </div>

        {checklist.mentor && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Assigned Mentor
                </p>
                <p className="text-sm text-gray-500">
                  {checklist.mentor.name} - {checklist.mentor.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}