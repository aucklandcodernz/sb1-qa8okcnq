import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { organizationsAtom } from '../../lib/organizations';
import type { CreateOrganizationData } from '../../types/organization';

const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  adminEmail: z.string().email('Invalid email address'),
  adminFirstName: z.string().min(2, 'First name must be at least 2 characters'),
  adminLastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

export default function CreateOrganizationForm({ onSuccess }: { onSuccess: () => void }) {
  const [, setOrganizations] = useAtom(organizationsAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateOrganizationData>({
    resolver: zodResolver(createOrganizationSchema),
  });

  const onSubmit = (data: CreateOrganizationData) => {
    setOrganizations(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Organization Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
          Admin Email
        </label>
        <input
          {...register('adminEmail')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.adminEmail && (
          <p className="mt-1 text-sm text-red-600">{errors.adminEmail.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="adminFirstName" className="block text-sm font-medium text-gray-700">
            Admin First Name
          </label>
          <input
            {...register('adminFirstName')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.adminFirstName && (
            <p className="mt-1 text-sm text-red-600">{errors.adminFirstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="adminLastName" className="block text-sm font-medium text-gray-700">
            Admin Last Name
          </label>
          <input
            {...register('adminLastName')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.adminLastName && (
            <p className="mt-1 text-sm text-red-600">{errors.adminLastName.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Organization
        </button>
      </div>
    </form>
  );
}