import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Plus, Minus } from 'lucide-react';
import { AccidentSeverity } from '../../types/safety/accidents';
import { Role } from '../../types/auth';

const accidentReportSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  severity: z.enum(['MINOR', 'MODERATE', 'SERIOUS', 'CRITICAL']),
  injuryType: z.string().optional(),
  treatmentRequired: z.string().optional(),
  witnesses: z.array(z.string()).optional(),
  accessRoles: z.array(z.string()).min(1, 'At least one role must be selected'),
});

interface AccidentReportFormProps {
  employeeId: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const severityOptions: { value: AccidentSeverity; label: string }[] = [
  { value: 'MINOR', label: 'Minor' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'SERIOUS', label: 'Serious' },
  { value: 'CRITICAL', label: 'Critical' },
];

const roles: { value: Role; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ORG_ADMIN', label: 'Organization Admin' },
  { value: 'HR_MANAGER', label: 'HR Manager' },
  { value: 'DEPT_MANAGER', label: 'Department Manager' },
];

export default function AccidentReportForm({
  employeeId,
  onSubmit,
  onCancel,
}: AccidentReportFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(accidentReportSchema),
    defaultValues: {
      witnesses: [''],
      accessRoles: ['HR_MANAGER', 'DEPT_MANAGER'],
    },
  });

  const witnesses = watch('witnesses') || [''];

  const addWitness = () => {
    setValue('witnesses', [...witnesses, '']);
  };

  const removeWitness = (index: number) => {
    setValue('witnesses', witnesses.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      employeeId,
      witnesses: data.witnesses?.filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Report Accident/Incident
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            {...register('time')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
          )}
        </div>
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
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Describe what happened..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Severity
        </label>
        <select
          {...register('severity')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select severity</option>
          {severityOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.severity && (
          <p className="mt-1 text-sm text-red-600">{errors.severity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type of Injury
        </label>
        <input
          type="text"
          {...register('injuryType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Treatment Required
        </label>
        <textarea
          {...register('treatmentRequired')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Witnesses
          </label>
          <button
            type="button"
            onClick={addWitness}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Witness
          </button>
        </div>
        <div className="space-y-2">
          {witnesses.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                {...register(`witnesses.${index}`)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Witness name"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeWitness(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Access Roles
        </label>
        <div className="mt-2 space-y-2">
          {roles.map((role) => (
            <div key={role.value} className="flex items-center">
              <input
                type="checkbox"
                value={role.value}
                {...register('accessRoles')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                {role.label}
              </label>
            </div>
          ))}
        </div>
        {errors.accessRoles && (
          <p className="mt-1 text-sm text-red-600">{errors.accessRoles.message}</p>
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