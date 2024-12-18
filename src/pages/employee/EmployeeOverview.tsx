
import React from 'react';
import { EmployeeProfile } from '../../types/employee';
import EmployeeHeader from '../../components/employees/EmployeeHeader';
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
            <div>
              <dt className="text-sm text-gray-500">Nationality</dt>
              <dd className="font-medium">{profile.nationality}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Marital Status</dt>
              <dd className="font-medium">{profile.maritalStatus}</dd>
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
            <div>
              <dt className="text-sm text-gray-500">Status</dt>
              <dd className="font-medium">{profile.status}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Work Location</dt>
              <dd className="font-medium">{profile.workLocation}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Work Email</dt>
              <dd className="font-medium">{profile.workEmail}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Work Phone</dt>
              <dd className="font-medium">{profile.workPhone}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-sm text-gray-500">Address</dt>
              <dd className="font-medium">
                {profile.address?.street}<br />
                {profile.address?.city}, {profile.address?.state} {profile.address?.postalCode}<br />
                {profile.address?.country}
              </dd>
            </div>
          </dl>
        </div>

        {profile.emergencyContact && (
          <EmergencyContact contact={profile.emergencyContact} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Bank Details</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Account Name</dt>
              <dd className="font-medium">{profile.bankDetails?.accountName}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Bank Name</dt>
              <dd className="font-medium">{profile.bankDetails?.bankName}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Account Number</dt>
              <dd className="font-medium">{profile.bankDetails?.accountNumber}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Compensation</h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Salary</dt>
              <dd className="font-medium">
                {profile.salary?.amount.toLocaleString()} {profile.salary?.currency}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
