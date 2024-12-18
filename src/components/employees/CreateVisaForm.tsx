import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BadgeCheck, Plus, Minus } from 'lucide-react';
import { VisaType, CreateVisaData } from '../../types/visa';
import { Role } from '../../types/auth';

const createVisaSchema = z.object({
  type: z.enum(['WORK', 'STUDENT', 'RESIDENT', 'PERMANENT_RESIDENT']),
  visaNumber: z.string().min(1, 'Visa number is required'),
  startDate: z.string().min(1, 'Start date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  conditions: z.array(z.string()).optional(),
  workRights: z.object({
    maxHoursPerWeek: z.number().optional(),
    restrictions: z.array(z.string()).optional(),
  }),
  accessRoles: z.array(z.string()).min(1, 'At least one role must be selected'),
});

interface CreateVisaFormProps {
  employeeId: string;
  onSubmit: (data: CreateVisaData) => void;
  onCancel: () => void;
}

const visaTypes: { value: VisaType; label: string }[] = [
  { value: 'WORK', label: 'Work Visa' },
  { value: 'STUDENT', label: 'Student Visa' },
  { value: 'RESIDENT', label: 'Resident Visa' },
  { value: 'PERMANENT_RESIDENT', label: 'Permanent Resident' },
];

const roles: { value: Role; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ORG_ADMIN', label: 'Organization Admin' },
  { value: 'HR_MANAGER', label: 'HR Manager' },
  { value: 'DEPT_MANAGER', label: 'Department Manager' },
];

export default function CreateVisaForm({
  employeeId,
  onSubmit,
  onCancel,
}: CreateVisaFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(createVisaSchema),
    defaultValues: {
      conditions: [''],
      workRights: {
        restrictions: [''],
      },
      accessRoles: ['HR_MANAGER'],
    },
  });

  const conditions = watch('conditions') || [''];
  const restrictions = watch('workRights.restrictions') || [''];

  const addCondition = () => {
    setValue('conditions', [...conditions, '']);
  };

  const removeCondition = (index: number) => {
    setValue('conditions', conditions.filter((_, i) => i !== index));
  };

  const addRestriction = () => {
    setValue('workRights.restrictions', [...restrictions, '']);
  };

  const removeRestriction = (index: number) => {
    setValue('workRights.restrictions', restrictions.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <BadgeCheck className="h-5 w-5 mr-2 text-gray-400" />
          Add Visa Details
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
          Visa Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select visa type</option>
          {visaTypes.map((type) => (
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
          Visa Number
        </label>
        <input
          type="text"
          {...register('visaNumber')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.visaNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.visaNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            {...register('startDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            {...register('expiryDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Hours per Week
        </label>
        <input
          type="number"
          {...register('workRights.maxHoursPerWeek', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Work Restrictions
          </label>
          <button
            type="button"
            onClick={addRestriction}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Restriction
          </button>
        </div>
        <div className="space-y-2">
          {restrictions.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                {...register(`workRights.restrictions.${index}`)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter work restriction"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeRestriction(index)}
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
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Visa Conditions
          </label>
          <button
            type="button"
            onClick={addCondition}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Condition
          </button>
        </div>
        <div className="space-y-2">
          {conditions.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                {...register(`conditions.${index}`)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter visa condition"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeCondition(index)}
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
          Add Visa
        </button>
      </div>
    </form>
  );
}