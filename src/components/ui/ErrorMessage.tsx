import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
}

export default function ErrorMessage({ 
  title = 'Error', 
  message,
  className 
}: ErrorMessageProps) {
  return (
    <div className={cn(
      'rounded-lg bg-red-50 p-4',
      className
    )}>
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
}