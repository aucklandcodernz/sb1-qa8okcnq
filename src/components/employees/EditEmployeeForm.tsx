import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../ui/FormField';
import { useAtom } from 'jotai';
import { employeeProfilesAtom } from '../../lib/employees';
import { userAtom } from '../../atoms/user';
import LoadingSpinner from '../ui/LoadingSpinner';

const editEmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  role: z.enum(['HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(2, 'Position is required'),
  workLocation: z.string().optional(),
  workPhone: z.string().optional(),
  workEmail: z.string().email('Invalid work email').optional(),
});

const departments = [
  { id: 'eng', name: 'Engineering' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'sales', name: 'Sales' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'finance', name: 'Finance' }
];

export default function EditEmployeeForm() {
  const { id: employeeId } = useParams();
  const navigate = useNavigate();
  const [user, currentUser] = useAtom(userAtom);
  const [isSaving, setIsSaving] = useState(false);
  
  if (!user) {
    return <Navigate to="/login" state={{ from: `/employees/${employeeId}/edit` }} />;
  }
  const [employeeProfiles, setEmployeeProfiles] = useAtom(employeeProfilesAtom);
  const employee = employeeProfiles[employeeId];

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      phone: employee?.phone || '',
      role: employee?.role || 'EMPLOYEE',
      department: employee?.department || '',
      position: employee?.position || '',
      workLocation: employee?.workLocation || '',
      workPhone: employee?.workPhone || '',
      workEmail: employee?.workEmail || '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'user-id': currentUser.id 
        },
        body: JSON.stringify({
          ...data,
          version: employee.version
        })
      });

      if (response.status === 409) {
        // Handle version conflict
        const error = await response.json();
        toast.error(error.message);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update employee');
      }

      const updatedEmployee = await response.json();
      setEmployeeProfiles(prev => ({
        ...prev,
        [employeeId]: updatedEmployee
      }));
      navigate('/team');
    } catch (error) {
      console.error('Error saving employee:', error);
      // Handle error appropriately, e.g., display error message to user
    } finally {
      setIsSaving(false);
    }
  };

  if (!employee) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <FormField
          label="Phone"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            {...register('department')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Position"
          {...register('position')}
          error={errors.position?.message}
        />
        <FormField
          label="Work Location"
          {...register('workLocation')}
          error={errors.workLocation?.message}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Work Phone"
          type="tel"
          {...register('workPhone')}
          error={errors.workPhone?.message}
        />
        <FormField
          label="Work Email"
          type="email"
          {...register('workEmail')}
          error={errors.workEmail?.message}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => navigate('/team')}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}