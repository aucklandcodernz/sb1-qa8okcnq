import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

const createEmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']),
  startDate: z.string().min(1, 'Start date is required'),
  salary: z.object({
    amount: z.number().min(0, 'Salary must be a positive number'),
    currency: z.string().min(1, 'Currency is required'),
  }),
  bankDetails: z.object({
    accountName: z.string().min(1, 'Account name is required'),
    accountNumber: z.string().min(1, 'Account number is required'),
    bankName: z.string().min(1, 'Bank name is required'),
  }),
});

export default function CreateEmployeeForm({ onSubmit: onSuccess, onCancel }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      employmentType: 'FULL_TIME',
      status: 'ACTIVE',
      salary: { currency: 'NZD', amount: 0 },
      bankDetails: {
        accountName: '',
        accountNumber: '',
        bankName: ''
      }
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create employee');
      }
      
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
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
          { value: 'INTERN', label: 'Intern' },
        ]}
      />

      <FormField
        label="Start Date"
        type="date"
        {...register('startDate')}
        error={errors.startDate?.message}
      />

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Salary Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Amount"
            type="number"
            {...register('salary.amount', { valueAsNumber: true })}
            error={errors.salary?.amount?.message}
          />
          <FormSelect
            label="Currency"
            {...register('salary.currency')}
            error={errors.salary?.currency?.message}
            options={[
              { value: 'USD', label: 'USD' },
              { value: 'EUR', label: 'EUR' },
              { value: 'GBP', label: 'GBP' },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Bank Details</h4>
        <FormField
          label="Account Name"
          {...register('bankDetails.accountName')}
          error={errors.bankDetails?.accountName?.message}
        />
        <FormField
          label="Account Number"
          {...register('bankDetails.accountNumber')}
          error={errors.bankDetails?.accountNumber?.message}
        />
        <FormField
          label="Bank Name"
          {...register('bankDetails.bankName')}
          error={errors.bankDetails?.bankName?.message}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Employee
        </button>
      </div>
    </form>
  );
}