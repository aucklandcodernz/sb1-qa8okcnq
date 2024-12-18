import React from 'react';
import { format } from 'date-fns';
import { Target, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { PerformanceGoal } from '../../types/performance';
import { cn } from '../../lib/utils';

interface GoalsListProps {
  goals: PerformanceGoal[];
}

const statusConfig = {
  'NOT_STARTED': {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Not Started',
  },
  'IN_PROGRESS': {
    icon: Target,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'In Progress',
  },
  'COMPLETED': {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
};

const priorityColors = {
  'LOW': 'bg-gray-100 text-gray-800',
  'MEDIUM': 'bg-yellow-100 text-yellow-800',
  'HIGH': 'bg-red-100 text-red-800',
};

export default function GoalsList({ goals }: GoalsListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Target className="h-5 w-5 mr-2 text-gray-400" />
          Performance Goals
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {goals.map((goal) => {
              const status = statusConfig[goal.status];
              const StatusIcon = status.icon;
              
              return (
                <li key={goal.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', status.bgColor)}>
                        <StatusIcon className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {goal.description}
                        </p>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          priorityColors[goal.priority]
                        )}>
                          {goal.priority}
                        </span>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Due {format(new Date(goal.dueDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 rounded-full h-2"
                                style={{ width: `${goal.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {goal.progress}%
                          </span>
                        </div>
                      </div>
                      {goal.metrics.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {goal.metrics.map((metric, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {goal.feedback.length > 0 && (
                    <div className="mt-2 ml-14 text-sm text-gray-500">
                      <p className="font-medium">Latest Feedback:</p>
                      <p className="mt-1">
                        {goal.feedback[goal.feedback.length - 1].comment}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}