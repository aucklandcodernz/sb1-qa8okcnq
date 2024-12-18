import React from 'react';
import { Briefcase, DollarSign, Building2, Calendar } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';
import { format } from 'date-fns';

interface EmploymentDetailsProps {
  profile: EmployeeProfile;
}

export default function EmploymentDetails({ profile }: EmploymentDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Employment Details
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <span className="text-sm font-medium text-gray-500">Employee ID</span>
          <p className="mt-1 text-sm text-gray-900">{profile.employeeId}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Position</span>
          <p className="mt-1 text-sm text-gray-900">{profile.position}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Department</span>
          <p className="mt-1 text-sm text-gray-900">{profile.department}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Start Date</span>
          <p className="mt-1 text-sm text-gray-900">{profile.startDate}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Employment Type</span>
          <p className="mt-1 text-sm text-gray-900">{profile.employmentType}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Work Location</span>
          <p className="mt-1 text-sm text-gray-900">{profile.workLocation}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Status</span>
          <p className="mt-1 text-sm text-gray-900">{profile.status}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Manager</span>
          <p className="mt-1 text-sm text-gray-900">{profile.manager}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Salary</span>
          <p className="mt-1 text-sm text-gray-900 flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
            {profile.salary.amount.toLocaleString()} {profile.salary.currency}
          </p>
        </div>

      </div>
    </div>
  );
}