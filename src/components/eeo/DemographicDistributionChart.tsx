```typescript
import React from 'react';
import { cn } from '../../lib/utils';

interface DemographicDistributionChartProps {
  category: string;
  distribution: {
    value: string;
    count: number;
    percentage: number;
  }[];
  className?: string;
}

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-gray-500',
];

export default function DemographicDistributionChart({
  category,
  distribution,
  className,
}: DemographicDistributionChartProps) {
  const total = distribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className={cn('space-y-4', className)}>
      <h4 className="text-sm font-medium text-gray-900">{category}</h4>
      <div className="space-y-2">
        {distribution.map((item, index) => (
          <div key={item.value}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.value}</span>
              <span>{item.percentage.toFixed(1)}%</span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${item.percentage}%` }}
                  className={cn(
                    'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center',
                    colors[index % colors.length]
                  )}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {item.count} of {total} employees
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```