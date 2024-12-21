
import React from 'react';
import { cn } from '../../lib/utils';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export function Alert({ children, variant = 'info' }: AlertProps) {
  const variantStyles = {
    success: 'bg-green-50 text-green-800',
    error: 'bg-red-50 text-red-800',
    warning: 'bg-yellow-50 text-yellow-800',
    info: 'bg-blue-50 text-blue-800'
  };

  return (
    <div className={cn('rounded-md p-4', variantStyles[variant])}>
      {children}
    </div>
  );
}
