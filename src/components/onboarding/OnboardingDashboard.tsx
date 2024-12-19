
import React from 'react';
import { useAtom } from 'jotai';
import { employeeProfilesAtom } from '../../atoms/employeeState';
import OnboardingProgress from './OnboardingProgress';
import OnboardingStatus from './OnboardingStatus';

interface Props {
  employeeId: string;
}

export default function OnboardingDashboard({ employeeId }: Props) {
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const employee = employeeProfiles[employeeId];
  
  if (!employee?.onboarding) {
    return <div>No onboarding process found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Onboarding Progress</h2>
        <OnboardingProgress checklist={employee.onboarding} />
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Tasks Status</h2>
        <OnboardingStatus 
          employeeId={employeeId} 
          tasks={employee.onboarding.tasks} 
        />
      </div>
    </div>
  );
}
