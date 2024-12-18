import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  onClear,
  className,
  placeholder = 'Search...',
  ...props
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'block w-full pl-10 pr-10 py-2',
          'border border-gray-300 rounded-md',
          'focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500',
          'sm:text-sm'
        )}
        placeholder={placeholder}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
        </button>
      )}
    </div>
  );
}