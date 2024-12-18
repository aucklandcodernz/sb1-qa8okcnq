import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { Calendar, Clock } from 'lucide-react';
import { ReviewType } from '../../types/performance';
import { employeeProfilesAtom } from '../../lib/employees';
import { userAtom } from '../../lib/auth';
import { organizationDetailsAtom } from '../../lib/organizations';

const scheduleSchema = z.object({
  type: z.enum(['ANNUAL', 'QUARTERLY', 'PROBATION', 'PROJECT']),
  startDate: z.string().min(1, 'Start date is required'),
  employeeId: z.string().min(1, 'Employee is required'),
});

interface ReviewScheduleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: {
    type?: ReviewType;
    startDate?: string;
    employeeId?: string;
  };
}

const reviewTypes = [
  { value: 'ANNUAL', label: 'Annual Review' },
  { value: 'QUARTERLY', label: 'Quarterly Review' },
  { value: 'PROBATION', label: 'Probation Review' },
  { value: 'PROJECT', label: 'Project Review' },
];

export default function ReviewScheduleForm({
  onSubmit,
  onCancel,
  defaultValues,
}: ReviewScheduleFormProps) {
  const [employees] = useAtom(employeeProfilesAtom);
  const [user] = useAtom(userAtom);
  const [orgDetails] = useAtom(organizationDetailsAtom);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues,
  });

  const filteredEmployees = Object.values(employees).filter(emp => 
    emp.organizationId === user?.organizationId
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Schedule Review</h3>
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
          Review Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select review type</option>
          {reviewTypes.map((type) => (
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
          Start Date
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            {...register('startDate')}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Employee
        </label>
        <select
          {...register('employeeId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select employee</option>
          {filteredEmployees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName} - {employee.department}
            </option>
          ))}
        </select>
        {errors.employeeId && (
          <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
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
          Schedule Review
        </button>
      </div>
    </form>
  );
}