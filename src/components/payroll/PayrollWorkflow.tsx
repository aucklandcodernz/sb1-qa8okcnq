import React from 'react';
import { useAtom } from 'jotai';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { payrollItemsAtom } from '../../lib/payroll';
import { cn } from '../../lib/utils';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  dueDate?: string;
  assignedTo?: string;
}

export default function PayrollWorkflow() {
  const [payrollItems] = useAtom(payrollItemsAtom);

  // Mock workflow steps - in a real app these would be dynamic
  const steps: WorkflowStep[] = [
    {
      id: '1',
      title: 'Review Timesheets',
      description: '15 timesheets pending approval',
      status: 'IN_PROGRESS',
      dueDate: '2024-03-20',
      assignedTo: 'HR Manager'
    },
    {
      id: '2',
      title: 'Process Payroll',
      description: 'Calculate pay for 248 employees',
      status: 'PENDING',
      dueDate: '2024-03-22'
    },
    {
      id: '3',
      title: 'Tax Calculations',
      description: 'PAYE and KiwiSaver deductions',
      status: 'PENDING',
      dueDate: '2024-03-23'
    }
  ];

  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'ERROR':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'IN_PROGRESS':
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Payroll Workflow</h3>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'relative flex items-start',
                index !== steps.length - 1 && 'pb-8'
              )}
            >
              {index !== steps.length - 1 && (
                <div className="absolute top-8 left-4 -ml-px h-full w-0.5 bg-gray-200" />
              )}
              
              <div className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-full',
                step.status === 'COMPLETED' ? 'bg-green-50' :
                step.status === 'ERROR' ? 'bg-red-50' :
                step.status === 'IN_PROGRESS' ? 'bg-blue-50' :
                'bg-gray-50'
              )}>
                {getStepIcon(step.status)}
              </div>
              
              <div className="ml-4 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
                  {step.dueDate && (
                    <span className="text-sm text-gray-500">
                      Due: {new Date(step.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                {step.assignedTo && (
                  <p className="mt-1 text-xs text-gray-400">
                    Assigned to: {step.assignedTo}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}