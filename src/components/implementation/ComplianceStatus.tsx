
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkImplementationProgress } from '../../lib/utils/progress';

export default function ComplianceStatus() {
  const { data: progress } = useQuery({
    queryKey: ['implementation-progress'],
    queryFn: checkImplementationProgress
  });

  const criticalFeatures = progress?.filter(item => 
    ['KiwiSaver Integration', 'ACC Levy System', 'Compliance Monitoring'].includes(item.feature)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Compliance Status</h3>
      <div className="space-y-2">
        {criticalFeatures?.map((feature) => (
          <div key={feature.feature} className="flex justify-between items-center">
            <span>{feature.feature}</span>
            <span className={`px-2 py-1 rounded ${
              feature.status === 'completed' ? 'bg-green-100 text-green-700' : 
              'bg-yellow-100 text-yellow-700'
            }`}>
              {feature.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
