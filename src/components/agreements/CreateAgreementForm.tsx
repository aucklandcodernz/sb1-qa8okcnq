import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Plus, Minus } from 'lucide-react';
import { AgreementType, CreateAgreementData } from '../../types/agreements';
import { Role } from '../../types/auth';

const createAgreementSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  type: z.enum(['PERMANENT', 'FIXED_TERM', 'CASUAL', 'CONTRACTOR']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  department: z.string().min(1, 'Department is required'),
  salary: z.object({
    amount: z.number().min(0, 'Salary must be a positive number'),
    currency: z.string().min(1, 'Currency is required'),
    frequency: z.enum(['HOURLY', 'WEEKLY', 'FORTNIGHTLY', 'MONTHLY', 'ANNUALLY']),
  }),
  workingHours: z.object({
    hoursPerWeek: z.number().min(0),
    daysPerWeek: z.number().min(0).max(7),
    standardHours: z.object({
      start: z.string(),
      end: z.string(),
    }),
  }),
  benefits: z.array(z.object({
    type: z.string(),
    description: z.string(),
  })).optional(),
  terms: z.array(z.object({
    section: z.string(),
    content: z.string(),
  })).optional(),
  accessRoles: z.array(z.string()).min(1, 'At least one role must be selected'),
});

interface CreateAgreementFormProps {
  onSubmit: (data: CreateAgreementData) => void;
  onCancel: () => void;
}

const agreementTypes: { value: AgreementType; label: string }[] = [
  { value: 'PERMANENT', label: 'Permanent' },
  { value: 'FIXED_TERM', label: 'Fixed Term' },
  { value: 'CASUAL', label: 'Casual' },
  { value: 'CONTRACTOR', label: 'Contractor' },
];

const roles: { value: Role; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ORG_ADMIN', label: 'Organization Admin' },
  { value: 'HR_MANAGER', label: 'HR Manager' },
  { value: 'DEPT_MANAGER', label: 'Department Manager' },
];

export default function CreateAgreementForm({
  onSubmit,
  onCancel,
}: CreateAgreementFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(createAgreementSchema),
    defaultValues: {
      benefits: [{ type: '', description: '' }],
      terms: [{ section: '', content: '' }],
      accessRoles: ['HR_MANAGER'],
    },
  });

  const agreementType = watch('type');
  const benefits = watch('benefits') || [{ type: '', description: '' }];
  const terms = watch('terms') || [{ section: '', content: '' }];

  const addBenefit = () => {
    setValue('benefits', [...benefits, { type: '', description: '' }]);
  };

  const removeBenefit = (index: number) => {
    setValue('benefits', benefits.filter((_, i) => i !== index));
  };

  const addTerm = () => {
    setValue('terms', [...terms, { section: '', content: '' }]);
  };

  const removeTerm = (index: number) => {
    setValue('terms', terms.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-gray-400" />
          Create Employment Agreement
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
            Agreement Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select type</option>
            {agreementTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
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

        {(agreementType === 'FIXED_TERM' || agreementType === 'CONTRACTOR') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              {...register('endDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            {...register('position')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.position && (
            <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            {...register('department')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Salary Details</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              {...register('salary.amount', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              {...register('salary.currency')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="NZD">NZD</option>
              <option value="AUD">AUD</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frequency
            </label>
            <select
              {...register('salary.frequency')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="HOURLY">Hourly</option>
              <option value="WEEKLY">Weekly</option>
              <option value="FORTNIGHTLY">Fortnightly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="ANNUALLY">Annually</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Working Hours</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hours per Week
            </label>
            <input
              type="number"
              {...register('workingHours.hoursPerWeek', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Days per Week
            </label>
            <input
              type="number"
              {...register('workingHours.daysPerWeek', { valueAsNumber: true })}
              min="1"
              max="7"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Standard Start Time
            </label>
            <input
              type="time"
              {...register('workingHours.standardHours.start')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Standard End Time
            </label>
            <input
              type="time"
              {...register('workingHours.standardHours.end')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-900">Benefits</h4>
          <button
            type="button"
            onClick={addBenefit}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Benefit
          </button>
        </div>
        <div className="space-y-2">
          {benefits.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                {...register(`benefits.${index}.type`)}
                placeholder="Benefit type"
                className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                {...register(`benefits.${index}.description`)}
                placeholder="Description"
                className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-900">Terms & Conditions</h4>
          <button
            type="button"
            onClick={addTerm}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Term
          </button>
        </div>
        <div className="space-y-4">
          {terms.map((_, index) => (
            <div key={index} className="space-y-2">
              <input
                {...register(`terms.${index}.section`)}
                placeholder="Section title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <div className="flex space-x-2">
                <textarea
                  {...register(`terms.${index}.content`)}
                  rows={3}
                  placeholder="Section content"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeTerm(index)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                )}
              </div>
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
          Create Agreement
        </button>
      </div>
    </form>
  );
}