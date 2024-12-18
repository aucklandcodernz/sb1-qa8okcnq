import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Briefcase, Building2, Calendar, Clock } from 'lucide-react';
import FormField from '../../ui/FormField';
import FormSelect from '../../ui/FormSelect';

const employmentDetailsSchema = z.object({
  position: z.string().min(2, 'Position must be at least 2 characters'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']),
  department: z.string().min(1, 'Department is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  workingHours: z.object({
    hoursPerWeek: z.number().min(1, 'Hours per week is required'),
    standardHours: z.object({
      start: z.string().min(1, 'Start time is required'),
      end: z.string().min(1, 'End time is required'),
    }),
  }),
  reportsTo: z.string().optional(),
  probationPeriod: z.number().optional(),
  noticePeriod: z.number().min(1, 'Notice period is required'),
});

interface EmploymentDetailsFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  departments: Array<{ id: string; name: string }>;
  managers: Array<{ id: string; name: string }>;
}

export default function EmploymentDetailsForm({
  onSubmit,
  defaultValues,
  departments,
  managers,
}: EmploymentDetailsFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(employmentDetailsSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center mb-6">
        <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Employment Details</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Position"
          {...register('position')}
          error={errors.position?.message}
          leftIcon={<Briefcase className="h-5 w-5 text-gray-400" />}
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
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormSelect
          label="Department"
          {...register('department')}
          error={errors.department?.message}
          options={departments.map(dept => ({
            value: dept.id,
            label: dept.name,
          }))}
          leftIcon={<Building2 className="h-5 w-5 text-gray-400" />}
        />

        <FormSelect
          label="Reports To"
          {...register('reportsTo')}
          error={errors.reportsTo?.message}
          options={managers.map(manager => ({
            value: manager.id,
            label: manager.name,
          }))}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Start Date"
          type="date"
          {...register('startDate')}
          error={errors.startDate?.message}
          leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
        />

        <FormField
          label="End Date (if applicable)"
          type="date"
          {...register('endDate')}
          error={errors.endDate?.message}
          leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Working Hours</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label="Hours per Week"
            type="number"
            {...register('workingHours.hoursPerWeek', { valueAsNumber: true })}
            error={errors.workingHours?.hoursPerWeek?.message}
            leftIcon={<Clock className="h-5 w-5 text-gray-400" />}
          />

          <FormField
            label="Standard Start Time"
            type="time"
            {...register('workingHours.standardHours.start')}
            error={errors.workingHours?.standardHours?.start?.message}
          />

          <FormField
            label="Standard End Time"
            type="time"
            {...register('workingHours.standardHours.end')}
            error={errors.workingHours?.standardHours?.end?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Probation Period (months)"
          type="number"
          {...register('probationPeriod', { valueAsNumber: true })}
          error={errors.probationPeriod?.message}
        />

        <FormField
          label="Notice Period (days)"
          type="number"
          {...register('noticePeriod', { valueAsNumber: true })}
          error={errors.noticePeriod?.message}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Employment Details
        </button>
      </div>
    </form>
  );
}