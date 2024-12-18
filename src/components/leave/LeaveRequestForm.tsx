import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, FileText } from 'lucide-react';
import { LeaveType } from '../../types/leave';
import { LEAVE_ENTITLEMENTS } from '../../lib/leave/constants';

const leaveRequestSchema = z.object({
  type: z.enum(['ANNUAL', 'SICK', 'PARENTAL', 'BEREAVEMENT', 'OTHER']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(10, 'Please provide a detailed reason'),
  documents: z.array(z.any()).optional(),
  parentalLeaveDetails: z.object({
    isPrimaryCarer: z.boolean(),
    expectedDueDate: z.string().optional(),
    partnerLeaveStart: z.string().optional(),
  }).optional(),
});

interface LeaveRequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  currentBalance: number;
}

const LeaveRequestForm = ({ onSubmit, onCancel, currentBalance }: LeaveRequestFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(leaveRequestSchema),
  });

  const selectedType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Leave Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select leave type</option>
          <option value="ANNUAL">Annual Leave</option>
          <option value="SICK">Sick Leave</option>
          <option value="PARENTAL">Parental Leave</option>
          <option value="BEREAVEMENT">Bereavement Leave</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            End Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('endDate')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {selectedType === 'PARENTAL' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Primary Carer
            </label>
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('parentalLeaveDetails.isPrimaryCarer')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I am the primary carer
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Due Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                {...register('parentalLeaveDetails.expectedDueDate')}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reason
        </label>
        <textarea
          {...register('reason')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Please provide details about your leave request..."
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Supporting Documents
        </label>
        <div className="mt-1">
          <input
            type="file"
            multiple
            {...register('documents')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {selectedType === 'SICK' && 'Medical certificate required for sick leave over 3 consecutive days'}
          {selectedType === 'BEREAVEMENT' && 'Documentation may be required to confirm relationship'}
          {selectedType === 'PARENTAL' && 'Please provide relevant documentation (e.g., medical certificate, adoption papers)'}
        </p>
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
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default LeaveRequestForm;