import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Calendar, Users } from 'lucide-react';
import { FeedbackType } from '../../types/feedback';

const feedbackRequestSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  type: z.enum(['SELF', 'MANAGER', 'PEER', 'SUBORDINATE']),
  reviewers: z.array(z.string()).min(1, 'At least one reviewer is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  message: z.string().optional(),
});

interface FeedbackRequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const feedbackTypes: { value: FeedbackType; label: string }[] = [
  { value: 'SELF', label: 'Self Assessment' },
  { value: 'MANAGER', label: 'Manager Review' },
  { value: 'PEER', label: 'Peer Review' },
  { value: 'SUBORDINATE', label: 'Subordinate Review' },
];

export default function FeedbackRequestForm({ onSubmit, onCancel }: FeedbackRequestFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(feedbackRequestSchema),
  });

  const selectedType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Employee
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            {...register('employeeId')}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.employeeId && (
          <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Feedback Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select feedback type</option>
          {feedbackTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {selectedType && selectedType !== 'SELF' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reviewers
          </label>
          <div className="mt-2 space-y-2">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register(`reviewers.${index}`)}
                    type="text"
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={`Reviewer ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
          {errors.reviewers && (
            <p className="mt-1 text-sm text-red-600">{errors.reviewers.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            {...register('dueDate')}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Message (Optional)
        </label>
        <textarea
          {...register('message')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add a message for the reviewers..."
        />
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
          Request Feedback
        </button>
      </div>
    </form>
  );
}