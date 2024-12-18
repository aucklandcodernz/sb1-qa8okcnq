import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FilterChip {
  id: string;
  label: string;
  value: string;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onRemove: (id: string) => void;
  className?: string;
}

export default function FilterChips({
  filters,
  onRemove,
  className,
}: FilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {filters.map((filter) => (
        <span
          key={filter.id}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          {filter.label}: {filter.value}
          <button
            type="button"
            onClick={() => onRemove(filter.id)}
            className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
          >
            <span className="sr-only">Remove filter for {filter.label}</span>
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  );
}