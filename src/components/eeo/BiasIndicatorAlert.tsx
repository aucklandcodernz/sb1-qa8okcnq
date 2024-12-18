```typescript
import React from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BiasIndicatorAlertProps {
  indicators: Array<{
    category: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    recommendations: string[];
  }>;
  className?: string;
}

export default function BiasIndicatorAlert({
  indicators,
  className,
}: BiasIndicatorAlertProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(current =>
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    );
  };

  if (indicators.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      {indicators.map((indicator) => {
        const isExpanded = expandedCategories.includes(indicator.category);
        const severityColor = {
          LOW: 'text-yellow-800 bg-yellow-50',
          MEDIUM: 'text-orange-800 bg-orange-50',
          HIGH: 'text-red-800 bg-red-50',
        }[indicator.severity];

        return (
          <div
            key={indicator.category}
            className={cn('rounded-md p-4', severityColor)}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className={cn(
                  'h-5 w-5',
                  indicator.severity === 'LOW' ? 'text-yellow-400' :
                  indicator.severity === 'MEDIUM' ? 'text-orange-400' :
                  'text-red-400'
                )} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">
                      {indicator.category}
                    </h3>
                    <div className="mt-1 text-sm">
                      <p>{indicator.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleCategory(indicator.category)}
                    className={cn(
                      'ml-4 p-1.5 rounded-full hover:bg-opacity-20',
                      indicator.severity === 'LOW' ? 'hover:bg-yellow-600' :
                      indicator.severity === 'MEDIUM' ? 'hover:bg-orange-600' :
                      'hover:bg-red-600'
                    )}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {isExpanded && indicator.recommendations.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {indicator.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm">
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```