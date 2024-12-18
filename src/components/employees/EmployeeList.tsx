import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, MoreVertical } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';
import { cn } from '../../lib/utils';

interface EmployeeListProps {
  employees: EmployeeProfile[];
}

const employmentTypeColors = {
  'FULL_TIME': 'bg-blue-100 text-blue-800',
  'PART_TIME': 'bg-green-100 text-green-800',
  'CONTRACT': 'bg-yellow-100 text-yellow-800',
  'INTERN': 'bg-purple-100 text-purple-800',
};

const statusColors = {
  'ACTIVE': 'bg-green-100 text-green-800',
  'ON_LEAVE': 'bg-yellow-100 text-yellow-800',
  'TERMINATED': 'bg-red-100 text-red-800',
};

export default function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {employees.map((employee) => (
              <li key={employee.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {employee.position}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        employmentTypeColors[employee.employmentType]
                      )}>
                        {employee.employmentType.replace('_', ' ')}
                      </span>
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusColors[employee.status]
                      )}>
                        {employee.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/employees/${employee.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Profile
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {employees.length === 0 && (
              <li className="py-4">
                <p className="text-center text-gray-500">
                  No employees found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}