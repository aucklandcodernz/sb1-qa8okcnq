
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div className={cn('rounded-md bg-red-50 p-4', className)}>
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <p className="text-sm text-red-800">{message}</p>
        </div>
      </div>
    </div>
  );
}
