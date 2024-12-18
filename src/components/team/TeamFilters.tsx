import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface TeamFiltersProps {
  filters: FilterOption[];
  selectedFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
  className?: string;
}

export default function TeamFilters({
  filters,
  selectedFilters,
  onFilterChange,
  className,
}: TeamFiltersProps) {
  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Filter className="h-5 w-5 mr-2 text-gray-400" />
          Filters
        </h3>

        <div className="space-y-4">
          {filters.map((filter) => (
            <div key={filter.id}>
              <label className="block text-sm font-medium text-gray-700">
                {filter.label}
              </label>
              <select
                value={selectedFilters[filter.id] || ''}
                onChange={(e) => onFilterChange(filter.id, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}