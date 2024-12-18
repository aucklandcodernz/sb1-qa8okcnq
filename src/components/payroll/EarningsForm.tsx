import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DollarSign, Plus, Minus } from 'lucide-react';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

const earningsSchema = z.object({
  salary: z.object({
    amount: z.number().min(0, 'Salary must be a positive number'),
    frequency: z.enum(['HOURLY', 'WEEKLY', 'FORTNIGHTLY', 'MONTHLY', 'ANNUALLY']),
  }),
  allowances: z.array(z.object({
    type: z.string().min(1, 'Allowance type is required'),
    amount: z.number().min(0, 'Amount must be a positive number'),
    taxable: z.boolean(),
  })),
  overtime: z.object({
    hours: z.number().min(0),
    rate: z.number().min(1),
  }),
});

export default function EarningsForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(earningsSchema),
    defaultValues: {
      allowances: [{ type: '', amount: 0, taxable: true }],
      overtime: { hours: 0, rate: 1.5 },
    },
  });

  const allowances = watch('allowances');

  const addAllowance = () => {
    setValue('allowances', [...allowances, { type: '', amount: 0, taxable: true }]);
  };

  const removeAllowance = (index: number) => {
    setValue('allowances', allowances.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900">Base Salary</h4>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <FormField
            label="Amount"
            type="number"
            {...register('salary.amount', { valueAsNumber: true })}
            error={errors.salary?.amount?.message}
            leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
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

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-900">Allowances</h4>
          <button
            type="button"
            onClick={addAllowance}
            className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Allowance
          </button>
        </div>

        <div className="space-y-4">
          {allowances.map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  {...register(`allowances.${index}.type`)}
                  placeholder="Allowance type"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  {...register(`allowances.${index}.amount`, { valueAsNumber: true })}
                  placeholder="Amount"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`allowances.${index}.taxable`)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Taxable</label>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeAllowance(index)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Overtime</h4>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Hours"
            type="number"
            {...register('overtime.hours', { valueAsNumber: true })}
            error={errors.overtime?.hours?.message}
          />
          <FormField
            label="Rate Multiplier"
            type="number"
            step="0.5"
            {...register('overtime.rate', { valueAsNumber: true })}
            error={errors.overtime?.rate?.message}
          />
        </div>
      </div>
    </div>
  );
}