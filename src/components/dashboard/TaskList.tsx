import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface TaskListProps {
  tasks: Task[];
  className?: string;
}

export default function TaskList({ tasks, className }: TaskListProps) {
  const priorityColors = {
    LOW: 'bg-blue-50 text-blue-700',
    MEDIUM: 'bg-yellow-50 text-yellow-700',
    HIGH: 'bg-red-50 text-red-700',
  };

  const statusIcons = {
    PENDING: AlertCircle,
    IN_PROGRESS: Clock,
    COMPLETED: CheckCircle,
  };

  return (
    <div className={cn('bg-white rounded-lg shadow-sm', className)}>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks</h3>
        <div className="space-y-4">
          {tasks.map((task) => {
            const StatusIcon = statusIcons[task.status];
            return (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <StatusIcon className={cn(
                    'h-5 w-5',
                    task.status === 'COMPLETED' ? 'text-green-500' :
                    task.status === 'IN_PROGRESS' ? 'text-yellow-500' :
                    'text-gray-400'
                  )} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={cn(
                  'px-2.5 py-0.5 rounded-full text-xs font-medium',
                  priorityColors[task.priority]
                )}>
                  {task.priority}
                </span>
              </div>
            );
          })}
          {tasks.length === 0 && (
            <div className="text-center py-6">
              <CheckCircle className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">No tasks to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}