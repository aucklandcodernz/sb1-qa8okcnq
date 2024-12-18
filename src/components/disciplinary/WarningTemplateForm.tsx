import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Calendar } from 'lucide-react';
import { DisciplinaryType } from '../../types/disciplinary';

const warningTemplateSchema = z.object({
  type: z.enum(['VERBAL_WARNING', 'WRITTEN_WARNING', 'FINAL_WARNING']),
  details: z.string().min(10, 'Warning details must be at least 10 characters'),
  expiryDate: z.string().optional(),
  acknowledgmentRequired: z.boolean().optional(),
  improvementPlan: z.string().optional(),
  followUpDate: z.string().optional(),
});

interface WarningTemplateFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: {
    type?: DisciplinaryType;
    details?: string;
    expiryDate?: string;
  };
}

const warningTypes = [
  { value: 'VERBAL_WARNING', label: 'Verbal Warning' },
  { value: 'WRITTEN_WARNING', label: 'Written Warning' },
  { value: 'FINAL_WARNING', label: 'Final Warning' },
];

export default function WarningTemplateForm({
  onSubmit,
  onCancel,
  defaultValues,
}: WarningTemplateFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(warningTemplateSchema),
    defaultValues,
  });

  const warningType = watch('type');
  const requiresImprovement = ['WRITTEN_WARNING', 'FINAL_WARNING'].includes(warningType);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Issue Warning
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Warning Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select warning type</option>
          {warningTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Warning Details
        </label>
        <textarea
          {...register('details')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Describe the reason for this warning and specific incidents..."
        />
        {errors.details && (
          <p className="mt-1 text-sm text-red-600">{errors.details.message}</p>
        )}
      </div>

      {requiresImprovement && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Improvement Plan
          </label>
          <textarea
            {...register('improvementPlan')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Outline specific actions required for improvement..."
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('expiryDate')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Follow-up Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('followUpDate')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('acknowledgmentRequired')}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Require employee acknowledgment
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Issue Warning
        </button>
      </div>
    </form>
  );
}