import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { User } from '../../types/auth';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';

interface EmployeeListProps {
  employees: User[];
}

const roleColors = {
  'SUPER_ADMIN': 'bg-purple-100 text-purple-800',
  'ORG_ADMIN': 'bg-blue-100 text-blue-800',
  'HR_MANAGER': 'bg-green-100 text-green-800',
  'DEPT_MANAGER': 'bg-yellow-100 text-yellow-800',
  'SUPERVISOR': 'bg-orange-100 text-orange-800',
  'EMPLOYEE': 'bg-gray-100 text-gray-800',
  'STAKEHOLDER': 'bg-pink-100 text-pink-800',
};

export default function EmployeeList({ employees }: EmployeeListProps) {
  const { user } = useAuth();
  const canAddEmployee = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Employees</h3>
          {canAddEmployee && (
            <Link
              to="/employees/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Employee
            </Link>
          )}
        </div>
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
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                    <div className="mt-1">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        roleColors[employee.role]
                      )}>
                        {employee.role.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="space-x-2">
                      <Link
                        to={`/employees/${employee.id}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => onEditEmployee(employee.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {employees.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
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