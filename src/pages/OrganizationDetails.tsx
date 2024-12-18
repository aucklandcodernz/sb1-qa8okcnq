
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { organizationDetailsAtom } from '../lib/organizations';
import { Employee } from '../types/employee/relationships';
import OrganizationOverview from '../components/organizations/OrganizationOverview';
import DepartmentList from '../components/organizations/DepartmentList';
import EmployeeList from '../components/organizations/EmployeeList';
import CreateDepartmentForm from '../components/organizations/CreateDepartmentForm';
import CreateEmployeeForm from '../components/organizations/CreateEmployeeForm';

export default function OrganizationDetails() {
  const { id } = useParams<{ id: string }>();
  const [organizationDetails] = useAtom(organizationDetailsAtom);
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);
  const [showCreateEmployee, setShowCreateEmployee] = useState(false);

  const organization = id ? organizationDetails[id] : null;

  if (!organization) {
    return <Navigate to="/organizations" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{organization.name}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Organization details and management
        </p>
      </div>

      <OrganizationOverview organization={organization} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Departments</h3>
            <button
              onClick={() => setShowCreateDepartment(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-0.5 mr-2 h-4 w-4" />
              Add Department
            </button>
          </div>

          {showCreateDepartment ? (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <CreateDepartmentForm
                organizationId={id}
                onSuccess={() => setShowCreateDepartment(false)}
              />
            </div>
          ) : (
            <DepartmentList departments={organization.departments} />
          )}
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Employees</h3>
            <button
              onClick={() => setShowCreateEmployee(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-0.5 mr-2 h-4 w-4" />
              Add Employee
            </button>
          </div>

          {showCreateEmployee ? (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <CreateEmployeeForm
                organizationId={id}
                onSuccess={() => setShowCreateEmployee(false)}
              />
            </div>
          ) : (
            <EmployeeList employees={organization.employees} />
          )}
        </div>
      </div>
    </div>
  );
}
