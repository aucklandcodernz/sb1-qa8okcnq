
import React from 'react';
import { EmployeeProfile } from '../../types/employee';
import EmployeeHeader from '../../components/employees/EmployeeHeader';
import EmploymentDetails from '../../components/employees/EmploymentDetails';
import EmergencyContact from '../../components/employees/EmergencyContact';

interface EmployeeOverviewProps {
  profile: EmployeeProfile;
}

export default function EmployeeOverview({ profile }: EmployeeOverviewProps) {
  return (
    <div className="space-y-6">
      <EmployeeHeader profile={profile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Full Name</dt>
              <dd className="font-medium">{profile.firstName} {profile.lastName}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="font-medium">{profile.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Phone</dt>
              <dd className="font-medium">{profile.phone}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Date of Birth</dt>
              <dd className="font-medium">{profile.dateOfBirth}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Gender</dt>
              <dd className="font-medium">{profile.gender}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Tax ID</dt>
              <dd className="font-medium">{profile.taxId}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Employment Details</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Employee ID</dt>
              <dd className="font-medium">{profile.employeeId}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Department</dt>
              <dd className="font-medium">{profile.department}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Position</dt>
              <dd className="font-medium">{profile.position}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Start Date</dt>
              <dd className="font-medium">{profile.startDate}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Employment Type</dt>
              <dd className="font-medium">{profile.employmentType}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Manager</dt>
              <dd className="font-medium">{profile.manager}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {profile.emergencyContact && (
          <EmergencyContact contact={profile.emergencyContact} />
        )}
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Additional Information</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Work Location</dt>
              <dd className="font-medium">{profile.workLocation}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Office</dt>
              <dd className="font-medium">{profile.office}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Work Phone</dt>
              <dd className="font-medium">{profile.workPhone}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Work Email</dt>
              <dd className="font-medium">{profile.workEmail}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
