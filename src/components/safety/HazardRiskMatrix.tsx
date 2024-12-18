import React from 'react';
import { cn } from '../../lib/utils';

const LIKELIHOOD = ['RARE', 'UNLIKELY', 'POSSIBLE', 'LIKELY', 'ALMOST_CERTAIN'] as const;
const CONSEQUENCE = ['INSIGNIFICANT', 'MINOR', 'MODERATE', 'MAJOR', 'CATASTROPHIC'] as const;

const RISK_LEVELS = {
  LOW: { color: 'bg-green-100 text-green-800', label: 'Low' },
  MEDIUM: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
  HIGH: { color: 'bg-orange-100 text-orange-800', label: 'High' },
  CRITICAL: { color: 'bg-red-100 text-red-800', label: 'Critical' },
};

export default function HazardRiskMatrix() {
  const getRiskLevel = (likelihood: typeof LIKELIHOOD[number], consequence: typeof CONSEQUENCE[number]) => {
    const score = (LIKELIHOOD.indexOf(likelihood) + 1) * (CONSEQUENCE.indexOf(consequence) + 1);
    
    if (score <= 4) return 'LOW';
    if (score <= 9) return 'MEDIUM';
    if (score <= 16) return 'HIGH';
    return 'CRITICAL';
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment Matrix</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likelihood ↓<br />
                  Consequence →
                </th>
                {CONSEQUENCE.map((consequence) => (
                  <th
                    key={consequence}
                    className="px-4 py-2 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {consequence.toLowerCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {LIKELIHOOD.map((likelihood) => (
                <tr key={likelihood}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    {likelihood.toLowerCase()}
                  </td>
                  {CONSEQUENCE.map((consequence) => {
                    const riskLevel = getRiskLevel(likelihood, consequence);
                    const config = RISK_LEVELS[riskLevel];
                    
                    return (
                      <td
                        key={`${likelihood}-${consequence}`}
                        className="px-4 py-2 text-center"
                      >
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          config.color
                        )}>
                          {config.label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {Object.entries(RISK_LEVELS).map(([level, config]) => (
            <div key={level} className="flex items-center space-x-2">
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                config.color
              )}>
                {config.label}
              </span>
              <span className="text-xs text-gray-500">
                {level === 'LOW' && 'Monitor and review periodically'}
                {level === 'MEDIUM' && 'Implement additional controls'}
                {level === 'HIGH' && 'Immediate action required'}
                {level === 'CRITICAL' && 'Stop work immediately'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}