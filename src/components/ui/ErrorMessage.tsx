
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div className={cn('bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2', className)}>
      <AlertTriangle className="h-5 w-5 text-red-500" />
      <p className="text-red-700">{message}</p>
    </div>
  );
}
