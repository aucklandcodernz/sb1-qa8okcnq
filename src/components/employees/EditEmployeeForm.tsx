
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../ui/FormField';
import { useAtom } from 'jotai';
import { employeeProfilesAtom } from '../../lib/atoms';
import LoadingSpinner from '../ui/LoadingSpinner';

const editEmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']),
  departmentId: z.string().min(1, 'Department is required'),
});

export default function EditEmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const employee = employeeProfiles[id];

  if (!employee) {
    return <LoadingSpinner />;
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      role: employee.role,
      departmentId: employee.departmentId,
    }
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
    navigate('/team');
  };

  const onCancel = () => {
    navigate('/team');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
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
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <select
          {...register('departmentId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Department</option>
          <option value="dept1">Department 1</option>
          <option value="dept2">Department 2</option>
        </select>
        {errors.departmentId && (
          <p className="mt-1 text-sm text-red-600">{errors.departmentId.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
