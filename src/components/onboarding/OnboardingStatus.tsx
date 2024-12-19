
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface OnboardingStatusProps {
  employeeId: string;
  tasks: {
    id: string;
    title: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
    dueDate: string;
  }[];
}

export default function OnboardingStatus({ employeeId, tasks }: OnboardingStatusProps) {
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Onboarding Progress</h4>
        <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
      </div>
      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center space-x-3">
            {task.status === 'COMPLETED' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-gray-400" />
            )}
            <span className={`text-sm ${task.status === 'COMPLETED' ? 'text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
