import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { CheckSquare, Clock, FileText, User } from 'lucide-react';
import { onboardingChecklistsAtom } from '../../lib/recruitment';
import { cn } from '../../lib/utils';

const statusConfig = {
  'NOT_STARTED': {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Not Started',
  },
  'IN_PROGRESS': {
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'In Progress',
  },
  'COMPLETED': {
    icon: CheckSquare,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
};

export default function OnboardingList() {
  const [onboardingChecklists] = useAtom(onboardingChecklistsAtom);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <CheckSquare className="h-5 w-5 mr-2 text-gray-400" />
          Onboarding
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {onboardingChecklists.map((checklist) => {
              const status = statusConfig[checklist.status];
              const StatusIcon = status.icon;
              
              return (
                <li key={checklist.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        status.bgColor
                      )}>
                        <StatusIcon className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Employee ID: {checklist.employeeId}
                        </p>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Start Date: {format(new Date(checklist.startDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 rounded-full h-2"
                                style={{ width: `${checklist.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {checklist.progress}%
                          </span>
                        </div>
                      </div>
                      {checklist.mentor && (
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Mentor: {checklist.mentor.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View Tasks
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
            {onboardingChecklists.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No active onboarding processes
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}