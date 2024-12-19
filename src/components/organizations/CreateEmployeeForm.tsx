
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const employeeSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  position: z.string().min(2),
  department: z.string().min(2)
});

interface CreateEmployeeFormProps {
  organizationId: string;
  onSuccess: () => void;
}

export default function CreateEmployeeForm({ organizationId, onSuccess }: CreateEmployeeFormProps) {
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(employeeSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      setError('');
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          organizationId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create employee');
      }

      const result = await response.json();
      if (result.success) {
        onSuccess();
      } else {
        throw new Error(result.message || 'Failed to create employee');
      }
    } catch (err: any) {
      console.error('Error creating employee:', err);
      setError(err.message || 'Failed to create employee');
    }
  };
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          organizationId
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create employee');
      }

      if (!result.success) {
        throw new Error(result.message || 'Failed to create employee');
      }

      onSuccess();
    } catch (err: any) {
      console.error('Error creating employee:', err);
      setError(err.message || 'Failed to create employee');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input {...register('firstName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input {...register('lastName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input {...register('email')} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <input {...register('position')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <input {...register('department')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message as string}</p>}
      </div>

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
        Create Employee
      </button>
    </form>
  );
}
