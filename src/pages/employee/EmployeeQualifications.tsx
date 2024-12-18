import React from 'react';
import { EmployeeProfile } from '../../types/employee';
import EmployeeQualificationsComponent from '../../components/employees/EmployeeQualifications';

interface EmployeeQualificationsProps {
  profile: EmployeeProfile;
}

export default function EmployeeQualifications({ profile }: EmployeeQualificationsProps) {
  return (
    <div className="space-y-6">
      <EmployeeQualificationsComponent profile={profile} />
    </div>
  );
}