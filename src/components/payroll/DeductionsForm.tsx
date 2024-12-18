import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Minus } from 'lucide-react';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

const deductionsSchema = z.object({
  taxCode: z.enum(['M', 'ME', 'SB', 'S', 'SH', 'ST', 'SA']),
  kiwiSaver: z.object({
    enrolled: z.boolean(),
    rate: z.number().min(0.03).max(0.10),
  }),
  studentLoan: z.boolean(),
  otherDeductions: z.array(z.object({
    type: z.string().min(1, 'Deduction type is required'),
    amount: z.number().min(0, 'Amount must be a positive number'),
  })),
});

export default function DeductionsForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(deductionsSchema),
    defaultValues: {
      kiwiSaver: { enrolled: true, rate: 0.03 },
      studentLoan: false,
      otherDeductions: [{ type: '', amount: 0 }],
    },
  });

  const otherDeductions = watch('otherDeductions');
  const kiwiSaverEnrolled = watch('kiwiSaver.enrolled');

  const addDeduction = () => {
    setValue('otherDeductions', [...otherDeductions, { type: '', amount: 0 }]);
  };

  const removeDeduction = (index: number) => {
    setValue('otherDeductions', otherDeductions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900">Tax Details</h4>
        <div className="mt-2">
          <FormSelect
            label="Tax Code"
            {...register('taxCode')}
            error={errors.taxCode?.message}
            options={[
              { value: 'M', label: 'M - Primary employment' },
              { value: 'ME', label: 'ME - Primary with student loan exemption' },
              { value: 'SB', label: 'SB - Secondary employment' },
              { value: 'S', label: 'S - Secondary employment' },
              { value: 'SH', label: 'SH - Secondary higher rate' },
              { value: 'ST', label: 'ST - Secondary with student loan' },
              { value: 'SA', label: 'SA - Secondary with special tax rate' },
            ]}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900">KiwiSaver</h4>
        <div className="mt-2 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('kiwiSaver.enrolled')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Enrolled in KiwiSaver
            </label>
          </div>

          {kiwiSaverEnrolled && (
            <FormSelect
              label="Contribution Rate"
              {...register('kiwiSaver.rate', { valueAsNumber: true })}
              error={errors.kiwiSaver?.rate?.message}
              options={[
                { value: '0.03', label: '3%' },
                { value: '0.04', label: '4%' },
                { value: '0.06', label: '6%' },
                { value: '0.08', label: '8%' },
                { value: '0.10', label: '10%' },
              ]}
            />
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('studentLoan')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">
            Has student loan
          </label>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-900">Other Deductions</h4>
          <button
            type="button"
            onClick={addDeduction}
            className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Deduction
          </button>
        </div>

        <div className="space-y-4">
          {otherDeductions.map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  {...register(`otherDeductions.${index}.type`)}
                  placeholder="Deduction type"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  {...register(`otherDeductions.${index}.amount`, { valueAsNumber: true })}
                  placeholder="Amount"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeDeduction(index)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}