import React from 'react';
import { cn } from '../../lib/utils';

interface Option {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface FormRadioGroupProps {
  label?: string;
  name: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  className?: string;
}

export default function FormRadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  className,
}: FormRadioGroupProps) {
  return (
    <div className={className}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-2 space-y-4">
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              'relative flex items-start',
              option.disabled && 'opacity-50'
            )}
          >
            <div className="flex items-center h-5">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={option.disabled}
                className={cn(
                  'h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500',
                  error && 'border-red-300'
                )}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  'font-medium',
                  error ? 'text-red-900' : 'text-gray-700'
                )}
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-gray-500">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {hint && !error && (
        <p className="mt-2 text-sm text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}