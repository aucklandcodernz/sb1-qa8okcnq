import React from 'react';
import { useAtom } from 'jotai';
import { onboardingChecklistsAtom } from '../../lib/recruitment';
import { userAtom } from '../../lib/auth';
import OnboardingList from '../../components/recruitment/OnboardingList';

interface OnboardingProps {
  organizationId: string;
}

export default function Onboarding({ organizationId }: OnboardingProps) {
  const [onboardingChecklists] = useAtom(onboardingChecklistsAtom);
  const [user] = useAtom(userAtom);

  const filteredChecklists = user?.role === 'SUPER_ADMIN'
    ? onboardingChecklists
    : onboardingChecklists.filter(checklist => {
        const employee = checklist.employeeId.startsWith(organizationId);
        return employee;
      });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Onboarding</h3>
      <OnboardingList checklists={filteredChecklists} />
    </div>
  );
}