import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
  className?: string;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    iconColor: 'text-green-400',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    iconColor: 'text-red-400',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-400',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-400',
  },
};

export default function Toast({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  className,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5',
      config.bgColor,
      className
    )}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={cn('h-6 w-6', config.iconColor)} />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={cn('text-sm font-medium', config.textColor)}>
              {title}
            </p>
            {message && (
              <p className={cn('mt-1 text-sm', config.textColor)}>
                {message}
              </p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className={cn(
                'inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                config.textColor,
                'hover:opacity-75'
              )}
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}