import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function FormCheckbox({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: FormCheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
            error && 'border-red-300',
            className
          )}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
              'font-medium',
              error ? 'text-red-900' : 'text-gray-700'
            )}
          >
            {label}
          </label>
        )}
        {hint && !error && (
          <p className="text-gray-500">{hint}</p>
        )}
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}