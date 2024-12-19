
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
  Building
} from 'lucide-react';
import { OnboardingTask } from '../../types/onboarding';
import { useAtom } from 'jotai';
import { organizationsAtom } from '../../atoms/organizationState';
import { cn } from '../../lib/utils';

interface OnboardingTaskListProps {
  tasks: OnboardingTask[];
  employeeId: string;
  organizationId: string;
  onUpdateStatus: (taskId: string, status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED') => void;
}

export default function OnboardingTaskList({ 
  tasks, 
  employeeId,
  organizationId,
  onUpdateStatus 
}: OnboardingTaskListProps) {
  const [organizations] = useAtom(organizationsAtom);
  const organization = organizations[organizationId];

  const tasksByCategory = tasks.reduce((acc, task) => {
    const category = task.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {} as Record<string, OnboardingTask[]>);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">
            {organization?.name} Onboarding
          </h3>
        </div>
        <div className="text-sm text-gray-500">
          {tasks.filter(t => t.status === 'COMPLETED').length} of {tasks.length} tasks completed
        </div>
      </div>

      {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
        <div key={category} className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">{category}</h4>
            <div className="space-y-4">
              {categoryTasks.map(task => {
                const isCompleted = task.status === 'COMPLETED';
                const isInProgress = task.status === 'IN_PROGRESS';

                return (
                  <div 
                    key={task.id}
                    className={cn(
                      "p-4 rounded-lg border",
                      isCompleted ? "bg-green-50 border-green-200" :
                      isInProgress ? "bg-yellow-50 border-yellow-200" :
                      "bg-gray-50 border-gray-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : isInProgress ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="text-sm font-medium">{task.title}</span>
                      </div>
                      <select
                        value={task.status}
                        onChange={(e) => onUpdateStatus(task.id, e.target.value as any)}
                        className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                    <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {task.assignedTo}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
