import React from 'react';
import { AlertTriangle, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TrainingComplianceAlertProps {
  className?: string;
}

export default function TrainingComplianceAlert({ className }: TrainingComplianceAlertProps) {
  // Mock data - in a real app this would come from your state management
  const overdueTrainings = [
    { type: 'FIRST_AID', dueDate: '2024-02-01' },
    { type: 'FIRE_SAFETY', dueDate: '2024-03-15' },
  ];

  if (overdueTrainings.length === 0) return null;

  return (
    <div className={cn('rounded-md bg-yellow-50 p-4', className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Training Compliance Alert
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>The following training requirements need attention:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {overdueTrainings.map((training, index) => (
                <li key={index} className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {training.type.replace('_', ' ')} - Due {new Date(training.dueDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              >
                Schedule Training
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}