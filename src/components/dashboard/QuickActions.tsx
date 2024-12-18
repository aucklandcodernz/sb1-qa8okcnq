import React from 'react';
import { cn } from '../../lib/utils';

interface QuickAction {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export default function QuickActions({
  actions,
  className,
}: QuickActionsProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          className="w-full flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              {action.icon}
            </div>
          </div>
          <div className="ml-4 flex-1 text-left">
            <h4 className="text-sm font-medium text-gray-900">
              {action.title}
            </h4>
            {action.description && (
              <p className="mt-1 text-sm text-gray-500">
                {action.description}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}