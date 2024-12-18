```typescript
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DemographicTrendChartProps {
  category: string;
  changes: {
    value: string;
    previousPeriod: number;
    currentPeriod: number;
    percentageChange: number;
  }[];
  className?: string;
}

export default function DemographicTrendChart({
  category,
  changes,
  className,
}: DemographicTrendChartProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h4 className="text-sm font-medium text-gray-900">{category} Trends</h4>
      <div className="space-y-4">
        {changes.map((change) => (
          <div key={change.value} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{change.value}</span>
              <div className="flex items-center space-x-2">
                {change.percentageChange > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={cn(
                  'text-sm font-medium',
                  change.percentageChange > 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {change.percentageChange > 0 ? '+' : ''}
                  {change.percentageChange.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    Previous: {change.previousPeriod.toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    Current: {change.currentPeriod.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${change.previousPeriod}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
                />
              </div>
              <div className="mt-1 overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${change.currentPeriod}%` }}
                  className={cn(
                    'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center',
                    change.percentageChange > 0 ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```