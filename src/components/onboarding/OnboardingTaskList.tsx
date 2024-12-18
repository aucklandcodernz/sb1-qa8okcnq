import React from 'react';
import { format } from 'date-fns';
import { 
  CheckSquare, 
  Clock, 
  FileText, 
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { OnboardingTask } from '../../types/onboarding';
import { cn } from '../../lib/utils';

interface OnboardingTaskListProps {
  tasks: OnboardingTask[];
  onUpdateStatus: (taskId: string, status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED') => void;
}

const statusConfig = {
  'NOT_STARTED': {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Not Started',
  },
  'IN_PROGRESS': {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'In Progress',
  },
  'COMPLETED': {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
};

const categoryIcons = {
  PAPERWORK: FileText,
  IT_SETUP: CheckSquare,
  TRAINING: Clock,
  INTRODUCTION: User,
  COMPLIANCE: Calendar,
};

export default function OnboardingTaskList({ tasks, onUpdateStatus }: OnboardingTaskListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <CheckSquare className="h-5 w-5 mr-2 text-gray-400" />
          Onboarding Tasks
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {tasks.map((task) => {
              const status = statusConfig[task.status];
              const StatusIcon = status.icon;
              const CategoryIcon = categoryIcons[task.category];
              
              return (
                <li key={task.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        status.bgColor
                      )}>
                        <CategoryIcon className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {task.title}
                        </p>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {task.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          Assigned to: {task.assignedTo.replace('_', ' ')}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                        </div>
                        {task.completedAt && (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed: {format(new Date(task.completedAt), 'MMM d, yyyy')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <select
                        value={task.status}
                        onChange={(e) => onUpdateStatus(task.id, e.target.value as any)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}