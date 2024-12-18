import React from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'boolean';
  options?: { value: string; label: string }[];
}

interface FilterPanelProps {
  title?: string;
  filters: FilterOption[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onReset?: () => void;
  className?: string;
}

export default function FilterPanel({
  title = 'Filters',
  filters,
  values,
  onChange,
  onReset,
  className,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleFilterChange = (filterId: string, value: any) => {
    onChange({
      ...values,
      [filterId]: value,
    });
  };

  const renderFilterInput = (filter: FilterOption) => {
    switch (filter.type) {
      case 'select':
        return (
          <select
            value={values[filter.id] || ''}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="mt-1 space-y-2">
            {filter.options?.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={values[filter.id]?.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = values[filter.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    handleFilterChange(filter.id, newValues);
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            value={values[filter.id] || ''}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        );

      case 'daterange':
        return (
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              type="date"
              value={values[filter.id]?.start || ''}
              onChange={(e) =>
                handleFilterChange(filter.id, {
                  ...values[filter.id],
                  start: e.target.value,
                })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Start date"
            />
            <input
              type="date"
              value={values[filter.id]?.end || ''}
              onChange={(e) =>
                handleFilterChange(filter.id, {
                  ...values[filter.id],
                  end: e.target.value,
                })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="End date"
            />
          </div>
        );

      case 'boolean':
        return (
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={values[filter.id] || false}
                onChange={(e) => handleFilterChange(filter.id, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  const hasActiveFilters = Object.keys(values).length > 0;

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && onReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <X className="h-4 w-4 mr-1" />
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center text-gray-400 hover:text-gray-500"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {filters.map((filter) => (
              <div key={filter.id}>
                <label
                  htmlFor={filter.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {filter.label}
                </label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}