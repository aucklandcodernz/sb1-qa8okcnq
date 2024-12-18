
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { organizationDetailsAtom } from '../../lib/organizations';
import { Role } from '../../types/auth';
import FormField from '../ui/FormField';

const editEmployeeSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE'] as const),
  departmentId: z.string().min(1, 'Department is required'),
});

interface EditEmployeeFormProps {
  employeeId: string;
  organizationId: string;
  onSuccess: () => void;
}

export default function EditEmployeeForm({ employeeId, organizationId, onSuccess }: EditEmployeeFormProps) {
  const [organizationDetails, setOrganizationDetails] = useAtom(organizationDetailsAtom);
  const organization = organizationDetails[organizationId];
  const employee = organization.employees.find(emp => emp.id === employeeId);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      email: employee?.email,
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      role: employee?.role,
      departmentId: employee?.departmentId,
    }
  });

  const onSubmit = (data: any) => {
    const updatedEmployees = organization.employees.map(emp => 
      emp.id === employeeId ? { ...emp, ...data } : emp
    );

    setOrganizationDetails({
      ...organizationDetails,
      [organizationId]: {
        ...organization,
        employees: updatedEmployees,
      },
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <FormField
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <FormField
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
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
          <p className="mt-1 text-sm text-red-600">{errors.role?.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <select
          {...register('departmentId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {organization.departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        {errors.departmentId && (
          <p className="mt-1 text-sm text-red-600">{errors.departmentId?.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Employee
        </button>
      </div>
    </form>
  );
}
