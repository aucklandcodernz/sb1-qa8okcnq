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
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      onboardingTemplate: 'standard',
      startDate: ''
    }
  });

  const onboardingTemplates = [
    { id: 'standard', name: 'Standard Onboarding', duration: '2 weeks' },
    { id: 'technical', name: 'Technical Role Onboarding', duration: '3 weeks' },
    { id: 'management', name: 'Management Role Onboarding', duration: '4 weeks' },
    { id: 'remote', name: 'Remote Worker Onboarding', duration: '1 week' }
  ];

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

      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          {...register('startDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Onboarding Template</label>
        <select
          {...register('onboardingTemplate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {onboardingTemplates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name} ({template.duration})
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Employee
      </button>
    </form>
  );
}