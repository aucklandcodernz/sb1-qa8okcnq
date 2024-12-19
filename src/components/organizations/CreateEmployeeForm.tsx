
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '../../lib/validations/employee';
import { toast } from 'react-hot-toast';

interface Props {
  organizationId: string;
  onSuccess: () => void;
}

export default function CreateEmployeeForm({ organizationId, onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(employeeSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, organizationId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create employee');
      }

      toast.success('Employee created successfully');
      onSuccess();
    } catch (error) {
      console.error('Create employee error:', error);
      toast.error('Failed to create employee');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          {...register('firstName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          {...register('lastName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <input
          type="text"
          {...register('position')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.position && (
          <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Employee
      </button>
    </form>
  );
}
