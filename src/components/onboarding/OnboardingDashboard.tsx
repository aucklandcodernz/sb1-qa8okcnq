
import React from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useOnboardingStatus } from '../../hooks/useOnboardingStatus';
import OnboardingProgress from './OnboardingProgress';
import OnboardingStatus from './OnboardingStatus';

interface Props {
  employeeId: string;
}

export default function OnboardingDashboard({ employeeId }: Props) {
  const {
    onboarding,
    isLoading,
    error,
    updateOnboarding,
    isUpdating
  } = useOnboardingStatus(employeeId || '');

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load onboarding status
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="ml-3 text-sm text-red-700">Failed to load onboarding status</p>
        </div>
      </div>
    );
  }

  if (!onboarding) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No onboarding process found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Onboarding Progress</h2>
          <div className="flex items-center space-x-2">
            {onboarding.status === 'COMPLETED' && (
              <span className="flex items-center text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </span>
            )}
            {isUpdating && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            )}
          </div>
        </div>
        <OnboardingProgress 
          checklist={onboarding} 
          onUpdate={updateOnboarding}
        />
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Tasks Status</h2>
        <OnboardingStatus 
          employeeId={employeeId} 
          tasks={onboarding.tasks}
          organizationId={onboarding.organizationId}
        />
      </div>
    </div>
  );
}
