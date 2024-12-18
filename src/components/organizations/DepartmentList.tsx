import React from 'react';
import { Department } from '../../types/organization';
import { Users, Building2 } from 'lucide-react';

interface DepartmentListProps {
  departments: Department[];
}

export default function DepartmentList({ departments }: DepartmentListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Departments</h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {departments.map((dept) => (
              <li key={dept.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {dept.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created on {new Date(dept.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Users className="h-4 w-4 mr-2" />
                      View Members
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}