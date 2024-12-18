import React from 'react';
import { EmployeeProfile } from '../../types/employee';
import EmployeeHeader from '../../components/employees/EmployeeHeader';
import EmploymentDetails from '../../components/employees/EmploymentDetails';
import EmergencyContact from '../../components/employees/EmergencyContact';
import EmployeeDocuments from '../../components/employees/EmployeeDocuments';
import EmployeeQualifications from '../../components/employees/EmployeeQualifications';

interface EmployeeOverviewProps {
  profile: EmployeeProfile;
}

export default function EmployeeOverview({ profile }: EmployeeOverviewProps) {
  return (
    <div className="space-y-6">
      <EmployeeHeader profile={profile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmploymentDetails profile={profile} />
        {profile.emergencyContact && (
          <EmergencyContact contact={profile.emergencyContact} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeDocuments profile={profile} />
        <EmployeeQualifications profile={profile} />
      </div>
    </div>
  );
}