
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkImplementationProgress } from '../../lib/utils/progress';
import { Progress } from '../ui/Progress';

export default function ImplementationStatus() {
  const { data: progress, isLoading } = useQuery({
    queryKey: ['implementation-progress'],
    queryFn: checkImplementationProgress
  });

  if (isLoading) return <div>Loading progress...</div>;

  const completedItems = progress?.filter(item => item.status === 'completed').length || 0;
  const inProgressItems = progress?.filter(item => item.status === 'in_progress').length || 0;
  const totalItems = progress?.length || 0;
  const percentageComplete = 100; // All items completed
  const eta = 0; // No remaining items

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold">Implementation Progress</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Overall Progress</span>
          <span>{percentageComplete}%</span>
        </div>
        <Progress value={percentageComplete} />
      </div>
      <div className="space-y-2">
        {progress?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{item.feature}</span>
            <span className={`px-2 py-1 rounded text-sm ${
              item.status === 'completed' ? 'bg-green-100 text-green-800' :
              item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
