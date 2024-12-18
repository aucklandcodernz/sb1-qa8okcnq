import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Plus, Minus } from 'lucide-react';
import { Role } from '../../types/auth';

const createHazardSchema = z.object({
  type: z.enum(['PHYSICAL', 'CHEMICAL', 'BIOLOGICAL', 'ERGONOMIC', 'PSYCHOLOGICAL']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  controlMeasures: z.array(z.string()).min(1, 'At least one control measure is required'),
  reviewDate: z.string().min(1, 'Review date is required'),
});

interface CreateHazardFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function CreateHazardForm({
  onSubmit,
  onCancel,
}: CreateHazardFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(createHazardSchema),
    defaultValues: {
      controlMeasures: [''],
    },
  });

  const controlMeasures = watch('controlMeasures') || [''];

  const addControlMeasure = () => {
    setValue('controlMeasures', [...controlMeasures, '']);
  };

  const removeControlMeasure = (index: number) => {
    setValue('controlMeasures', controlMeasures.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Report Hazard
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
          Hazard Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select hazard type</option>
          <option value="PHYSICAL">Physical</option>
          <option value="CHEMICAL">Chemical</option>
          <option value="BIOLOGICAL">Biological</option>
          <option value="ERGONOMIC">Ergonomic</option>
          <option value="PSYCHOLOGICAL">Psychological</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Describe the hazard in detail..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Risk Level
        </label>
        <select
          {...register('riskLevel')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select risk level</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        {errors.riskLevel && (
          <p className="mt-1 text-sm text-red-600">{errors.riskLevel.message}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Control Measures
          </label>
          <button
            type="button"
            onClick={addControlMeasure}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Measure
          </button>
        </div>
        <div className="space-y-2">
          {controlMeasures.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                {...register(`controlMeasures.${index}`)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter control measure"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeControlMeasure(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.controlMeasures && (
          <p className="mt-1 text-sm text-red-600">{errors.controlMeasures.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Review Date
        </label>
        <input
          type="date"
          {...register('reviewDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.reviewDate && (
          <p className="mt-1 text-sm text-red-600">{errors.reviewDate.message}</p>
        )}
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
          Submit Report
        </button>
      </div>
    </form>
  );
}