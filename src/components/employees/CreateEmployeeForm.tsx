import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateEmployeeProfileData } from '../../types/employee';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

const createEmployeeSchema = z.object({
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

interface CreateEmployeeFormProps {
  onSubmit: (data: CreateEmployeeProfileData) => void;
  onCancel: () => void;
}

export default function CreateEmployeeForm({
  onSubmit,
  onCancel,
}: CreateEmployeeFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateEmployeeProfileData>({
    resolver: zodResolver(createEmployeeSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Employee
        </button>
      </div>
    </form>
  );
}