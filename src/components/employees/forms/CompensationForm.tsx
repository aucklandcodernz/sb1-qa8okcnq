import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import FormField from '../../ui/FormField';
import FormSelect from '../../ui/FormSelect';

const compensationSchema = z.object({
  salary: z.object({
    amount: z.number().min(0, 'Salary must be a positive number'),
    currency: z.string().min(1, 'Currency is required'),
    frequency: z.enum(['HOURLY', 'WEEKLY', 'FORTNIGHTLY', 'MONTHLY', 'ANNUALLY']),
  }),
  kiwiSaver: z.object({
    enrolled: z.boolean(),
    contributionRate: z.number().min(0.03).max(0.10).optional(),
  }),
  allowances: z.array(z.object({
    type: z.string(),
    amount: z.number(),
    frequency: z.enum(['WEEKLY', 'FORTNIGHTLY', 'MONTHLY', 'ANNUALLY']),
    taxable: z.boolean(),
  })).optional(),
  bonuses: z.array(z.object({
    type: z.string(),
    amount: z.number(),
    paymentDate: z.string(),
    conditions: z.string().optional(),
  })).optional(),
});

interface CompensationFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function CompensationForm({ onSubmit, defaultValues }: CompensationFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(compensationSchema),
    defaultValues,
  });

  const isKiwiSaverEnrolled = watch('kiwiSaver.enrolled');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center mb-6">
        <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Compensation Details</h3>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Base Salary</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label="Amount"
            type="number"
            step="0.01"
            {...register('salary.amount', { valueAsNumber: true })}
            error={errors.salary?.amount?.message}
            leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
          />

          <FormSelect
            label="Currency"
            {...register('salary.currency')}
            error={errors.salary?.currency?.message}
            options={[
              { value: 'NZD', label: 'NZD' },
              { value: 'AUD', label: 'AUD' },
              { value: 'USD', label: 'USD' },
            ]}
          />

          <FormSelect
            label="Frequency"
            {...register('salary.frequency')}
            error={errors.salary?.frequency?.message}
            options={[
              { value: 'HOURLY', label: 'Hourly' },
              { value: 'WEEKLY', label: 'Weekly' },
              { value: 'FORTNIGHTLY', label: 'Fortnightly' },
              { value: 'MONTHLY', label: 'Monthly' },
              { value: 'ANNUALLY', label: 'Annually' },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">KiwiSaver</h4>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('kiwiSaver.enrolled')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Enrolled in KiwiSaver
            </label>
          </div>

          {isKiwiSaverEnrolled && (
            <FormField
              label="Contribution Rate"
              type="number"
              step="0.01"
              min="0.03"
              max="0.10"
              {...register('kiwiSaver.contributionRate', { valueAsNumber: true })}
              error={errors.kiwiSaver?.contributionRate?.message}
              leftIcon={<Percent className="h-5 w-5 text-gray-400" />}
              hint="Between 3% and 10%"
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Allowances</h4>
        <div className="space-y-4">
          {/* Add allowance fields dynamically */}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Bonuses</h4>
        <div className="space-y-4">
          {/* Add bonus fields dynamically */}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Compensation Details
        </button>
      </div>
    </form>
  );
}