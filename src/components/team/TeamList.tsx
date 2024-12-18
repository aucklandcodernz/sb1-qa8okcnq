import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Mail, Phone, Building2, Calendar, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns';
import { EmployeeProfile } from '../../types/employee';
import { cn } from '../../lib/utils';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/auth';

interface TeamListProps {
  employees: EmployeeProfile[];
  onEmployeeClick?: (employeeId: string) => void;
}

const statusColors = {
  'ACTIVE': 'bg-green-100 text-green-800',
  'ON_LEAVE': 'bg-yellow-100 text-yellow-800',
  'TERMINATED': 'bg-red-100 text-red-800',
};

const employmentTypeColors = {
  'FULL_TIME': 'bg-blue-100 text-blue-800',
  'PART_TIME': 'bg-purple-100 text-purple-800',
  'CONTRACT': 'bg-orange-100 text-orange-800',
  'INTERN': 'bg-teal-100 text-teal-800',
};

export default function TeamList({ employees, onEmployeeClick }: TeamListProps) {
  const [user] = useAtom(userAtom);
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
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {employee.position}
                      </p>
                      <div className="flex space-x-2">
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
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {employee.email}
                      </div>
                      {employee.phoneNumber && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {employee.phoneNumber}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Building2 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {employee.departmentId}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        Joined {format(new Date(employee.startDate), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <Link
                        to={`/employees/${employee.id}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Profile
                      </Link>
                      {['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '') && (
                        <Link
                          to={`/employees/${employee.id}/edit`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onEmployeeClick) {
                              onEmployeeClick(employee.id);
                            } else {
                              window.location.href = `/employees/${employee.id}/edit`;
                            }
                          }}
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {employees.length === 0 && (
              <li className="py-4">
                <p className="text-center text-gray-500">
                  No team members found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}