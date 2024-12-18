import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { usersAtom } from '../../lib/users';
import { userAtom } from '../../lib/auth';
import { organizationsAtom } from '../../lib/organizations';
import { CreateUserData } from '../../types/user';

const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE', 'STAKEHOLDER']),
  organizationId: z.string().optional(),
  departmentId: z.string().optional(),
  phoneNumber: z.string().optional(),
});

interface CreateUserFormProps {
  onSuccess: () => void;
}

export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser] = useAtom(userAtom);
  const [organizations] = useAtom(organizationsAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = (data: CreateUserData) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE' as const,
    };

    setUsers([...users, newUser]);
    onSuccess();
  };

  const availableRoles = currentUser?.role === 'SUPER_ADMIN'
    ? ['ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE', 'STAKEHOLDER']
    : ['HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
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
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
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
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
          <option value="">Select a role</option>
          {availableRoles.map((role) => (
            <option key={role} value={role}>
              {role.replace('_', ' ')}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      {currentUser?.role === 'SUPER_ADMIN' && (
        <div>
          <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <select
            {...register('organizationId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select an organization</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          {errors.organizationId && (
            <p className="mt-1 text-sm text-red-600">{errors.organizationId.message}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          {...register('phoneNumber')}
          type="tel"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create User
        </button>
      </div>
    </form>
  );
}