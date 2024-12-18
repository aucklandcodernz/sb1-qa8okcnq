import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ComplianceItem {
  id: string;
  type: 'TAX' | 'KIWISAVER' | 'ACC' | 'MINIMUM_WAGE' | 'HOLIDAY_PAY';
  status: 'COMPLIANT' | 'WARNING' | 'NON_COMPLIANT';
  description: string;
  dueDate?: string;
  action?: string;
}

interface ComplianceMonitorProps {
  items: ComplianceItem[];
  className?: string;
}

export default function ComplianceMonitor({ items, className }: ComplianceMonitorProps) {
  const getStatusConfig = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'COMPLIANT':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'WARNING':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'NON_COMPLIANT':
        return {
          icon: AlertTriangle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
        Compliance Monitor
      </h3>

      <div className="space-y-4">
        {items.map((item) => {
          const config = getStatusConfig(item.status);
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className={cn(
                'p-4 rounded-lg border',
                config.borderColor
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  'h-10 w-10 rounded-lg flex items-center justify-center',
                  config.bgColor
                )}>
                  <Icon className={cn('h-6 w-6', config.color)} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.type.replace('_', ' ')}
                    </h4>
                    {item.dueDate && (
                      <span className="text-sm text-gray-500">
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                  {item.action && (
                    <button
                      className={cn(
                        'mt-2 inline-flex items-center px-3 py-1 rounded-md text-sm font-medium',
                        item.status === 'NON_COMPLIANT' 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      )}
                    >
                      {item.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}