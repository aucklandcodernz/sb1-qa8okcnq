
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { organizationDetailsAtom } from '../../lib/organizations';
import { Role } from '../../types/auth';

const createEmployeeSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE'] as const),
  departmentId: z.string().min(1, 'Department is required'),
});

interface CreateEmployeeFormProps {
  organizationId: string;
  onSuccess: () => void;
}

export default function CreateEmployeeForm({ organizationId, onSuccess }: CreateEmployeeFormProps) {
  const [organizationDetails, setOrganizationDetails] = useAtom(organizationDetailsAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      role: 'EMPLOYEE'
    }
  });

  const organization = organizationDetails[organizationId] || {
    departments: [{ id: 'd1', name: 'Engineering' }],
    employees: []
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newEmployee = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        organizationId,
        departmentId: data.departmentId,
      };

      setOrganizationDetails({
        ...organizationDetails,
        [organizationId]: {
          ...organization,
          employees: [...organization.employees, newEmployee],
        },
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating employee:', error);
      // Handle error appropriately
    }
  });
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role as Role,
      organizationId,
      departmentId: data.departmentId,
    };

    setOrganizationDetails({
      ...organizationDetails,
      [organizationId]: {
        ...organization,
        employees: [...organization.employees, newEmployee],
      },
    });

    onSuccess();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register('firstName')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName?.message?.toString()}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register('lastName')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName?.message?.toString()}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email?.message?.toString()}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          {...register('role')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="HR_MANAGER">HR Manager</option>
          <option value="DEPT_MANAGER">Department Manager</option>
          <option value="SUPERVISOR">Supervisor</option>
          <option value="EMPLOYEE">Employee</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role?.message?.toString()}</p>
        )}
      </div>

      <div>
        <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          {...register('departmentId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a department</option>
          {organization.departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.departmentId && (
          <p className="mt-1 text-sm text-red-600">{errors.departmentId?.message?.toString()}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Employee
        </button>
      </div>
    </form>
  );
}
