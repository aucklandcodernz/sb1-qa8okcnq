import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '../../lib/validations/employee';
import type { CreateEmployeeInput } from '../../lib/validations/employee';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

interface CreateEmployeeFormProps {
  organizationId: string;
  onSuccess: () => void;
}

export default function CreateEmployeeForm({ organizationId, onSuccess }: CreateEmployeeFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateEmployeeInput>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      organizationId,
      employmentType: 'FULL_TIME',
      status: 'ACTIVE',
      startDate: new Date(),
    }
  });

  const onSubmit = async (data: CreateEmployeeInput) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to create employee');
      
      onSuccess();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        
        <FormField
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        
        <FormField
          label="Position"
          {...register('position')}
          error={errors.position?.message}
        />
        
        <FormSelect
          label="Employment Type"
          {...register('employmentType')}
          error={errors.employmentType?.message}
          options={[
            { value: 'FULL_TIME', label: 'Full Time' },
            { value: 'PART_TIME', label: 'Part Time' },
            { value: 'CONTRACT', label: 'Contract' },
            { value: 'INTERN', label: 'Intern' }, // Added Intern option
          ]}
        />
        
        <FormField
          label="Start Date"
          type="date"
          {...register('startDate')}
          error={errors.startDate?.message}
        />
        <FormField
          label="Phone Number"
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />

        <FormField
          label="Street Address"
          {...register('address.street')}
          error={errors.address?.street?.message}
        />
        <FormField
          label="City"
          {...register('address.city')}
          error={errors.address?.city?.message}
        />
        <FormField
          label="Postal Code"
          {...register('address.postalCode')}
          error={errors.address?.postalCode?.message}
        />
        <FormField
          label="Country"
          {...register('address.country')}
          error={errors.address?.country?.message}
        />
        <FormField
          label="KiwiSaver Rate"
          type="number"
          step="0.01"
          {...register('kiwiSaverRate')}
          error={errors.kiwiSaverRate?.message}
        />
        <FormField
          label="Tax Code"
          {...register('taxCode')}
          error={errors.taxCode?.message}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Employee
        </button>
      </div>
    </form>
  );
}