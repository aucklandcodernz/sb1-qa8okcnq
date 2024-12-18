import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Plus, Minus } from 'lucide-react';
import { DisciplinaryType, CreateDisciplinaryData } from '../../types/disciplinary';
import { Role } from '../../types/auth';

const createDisciplinarySchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  type: z.enum(['VERBAL_WARNING', 'WRITTEN_WARNING', 'FINAL_WARNING', 'INVESTIGATION', 'TERMINATION']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  witnesses: z.array(z.string()).optional(),
  confidentialityLevel: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  accessRoles: z.array(z.string()).min(1, 'At least one role must be selected'),
});

interface CreateDisciplinaryFormProps {
  onSubmit: (data: CreateDisciplinaryData) => void;
  onCancel: () => void;
}

const disciplinaryTypes: { value: DisciplinaryType; label: string }[] = [
  { value: 'VERBAL_WARNING', label: 'Verbal Warning' },
  { value: 'WRITTEN_WARNING', label: 'Written Warning' },
  { value: 'FINAL_WARNING', label: 'Final Warning' },
  { value: 'INVESTIGATION', label: 'Investigation' },
  { value: 'TERMINATION', label: 'Termination' },
];

const roles: { value: Role; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ORG_ADMIN', label: 'Organization Admin' },
  { value: 'HR_MANAGER', label: 'HR Manager' },
  { value: 'DEPT_MANAGER', label: 'Department Manager' },
];

export default function CreateDisciplinaryForm({
  onSubmit,
  onCancel,
}: CreateDisciplinaryFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(createDisciplinarySchema),
    defaultValues: {
      witnesses: [''],
      confidentialityLevel: 'MEDIUM',
      accessRoles: ['HR_MANAGER'],
    },
  });

  const witnesses = watch('witnesses') || [''];

  const addWitness = () => {
    setValue('witnesses', [...witnesses, '']);
  };

  const removeWitness = (index: number) => {
    const newWitnesses = witnesses.filter((_, i) => i !== index);
    setValue('witnesses', newWitnesses);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Create Disciplinary Case
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
          Employee ID
        </label>
        <input
          type="text"
          {...register('employeeId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.employeeId && (
          <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select type</option>
          {disciplinaryTypes.map((type) => (
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
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Provide detailed description of the incident..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., Attendance, Performance, Conduct"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Witnesses
        </label>
        <div className="mt-2 space-y-2">
          {witnesses.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                {...register(`witnesses.${index}`)}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Witness name or employee ID"
              />
              {index === witnesses.length - 1 ? (
                <button
                  type="button"
                  onClick={addWitness}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Plus className="h-5 w-5" />
                </button>
              ) : (
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
          Confidentiality Level
        </label>
        <select
          {...register('confidentialityLevel')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
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
          Create Case
        </button>
      </div>
    </form>
  );
}