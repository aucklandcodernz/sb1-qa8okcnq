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
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
        Employment Details
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <span className="text-sm font-medium text-gray-500">Position</span>
          <p className="mt-1 text-sm text-gray-900">{profile.position}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Employment Type</span>
          <p className="mt-1 text-sm text-gray-900">{profile.employmentType}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Department</span>
          <p className="mt-1 text-sm text-gray-900 flex items-center">
            <Building2 className="h-4 w-4 mr-1 text-gray-400" />
            {profile.departmentId}
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Start Date</span>
          <p className="mt-1 text-sm text-gray-900 flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            {format(new Date(profile.startDate), 'MMMM d, yyyy')}
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Salary</span>
          <p className="mt-1 text-sm text-gray-900 flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
            {profile.salary.amount.toLocaleString()} {profile.salary.currency}
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Status</span>
          <p className="mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${profile.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                profile.status === 'ON_LEAVE' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'}`}>
              {profile.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}