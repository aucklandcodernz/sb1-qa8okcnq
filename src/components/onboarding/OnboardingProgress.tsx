
import React from 'react';
import { Progress } from '../ui/Progress';
import { CheckCircle, Clock } from 'lucide-react';

interface Props {
  checklist: {
    completedTasks: number;
    totalTasks: number;
    currentPhase: string;
  };
}

export default function OnboardingProgress({ checklist }: Props) {
  const progress = Math.round((checklist.completedTasks / checklist.totalTasks) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Current Phase: {checklist.currentPhase}</h4>
          <p className="text-sm text-gray-500">{checklist.completedTasks} of {checklist.totalTasks} tasks completed</p>
        </div>
        <span className="text-lg font-semibold">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
