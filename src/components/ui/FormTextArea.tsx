import React from 'react';
import { cn } from '../../lib/utils';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function FormTextArea({
  label,
  error,
  hint,
  className,
  id,
  rows = 3,
  ...props
}: FormTextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={cn(
          'block w-full rounded-md shadow-sm sm:text-sm',
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}