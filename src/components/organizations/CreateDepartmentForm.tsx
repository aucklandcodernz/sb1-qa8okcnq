import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { organizationDetailsAtom } from '../../lib/organizations';

const createDepartmentSchema = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters'),
  managerEmail: z.string().email('Invalid email address'),
});

interface CreateDepartmentFormProps {
  organizationId: string;
  onSuccess: () => void;
}

export default function CreateDepartmentForm({ organizationId, onSuccess }: CreateDepartmentFormProps) {
  const [organizationDetails, setOrganizationDetails] = useAtom(organizationDetailsAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createDepartmentSchema),
  });

  const onSubmit = (data: any) => {
    const newDepartment = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOrganizationDetails({
      ...organizationDetails,
      [organizationId]: {
        ...organizationDetails[organizationId],
        departments: [...organizationDetails[organizationId].departments, newDepartment],
      },
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Department Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name?.message?.toString()}</p>
        )}
      </div>

      <div>
        <label htmlFor="managerEmail" className="block text-sm font-medium text-gray-700">
          Manager Email
        </label>
        <input
          {...register('managerEmail')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.managerEmail && (
          <p className="mt-1 text-sm text-red-600">{errors.managerEmail?.message?.toString()}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Department
        </button>
      </div>
    </form>
  );
}