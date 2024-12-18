import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Scale, FileText } from 'lucide-react';
import { DisciplinaryCase } from '../../types/disciplinary';

const appealReviewSchema = z.object({
  decision: z.enum(['APPROVED', 'REJECTED']),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  actions: z.string().optional(),
  nextSteps: z.string().optional(),
});

interface AppealReviewFormProps {
  disciplinaryCase: DisciplinaryCase;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AppealReviewForm({
  disciplinaryCase,
  onSubmit,
  onCancel,
}: AppealReviewFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(appealReviewSchema),
  });

  const decision = watch('decision');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Scale className="h-5 w-5 mr-2 text-gray-400" />
          Review Appeal
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>

      {disciplinaryCase.appeal && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-900 flex items-center mb-2">
            <FileText className="h-4 w-4 mr-2 text-gray-400" />
            Appeal Details
          </h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {disciplinaryCase.appeal.reason}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Decision
        </label>
        <select
          {...register('decision')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select decision</option>
          <option value="APPROVED">Approve Appeal</option>
          <option value="REJECTED">Reject Appeal</option>
        </select>
        {errors.decision && (
          <p className="mt-1 text-sm text-red-600">{errors.decision.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reason for Decision
        </label>
        <textarea
          {...register('reason')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Provide detailed reasoning for your decision..."
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      {decision === 'APPROVED' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Required Actions
          </label>
          <textarea
            {...register('actions')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="List any actions that need to be taken..."
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Next Steps
        </label>
        <textarea
          {...register('nextSteps')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Outline the next steps in the process..."
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
          Submit Review
        </button>
      </div>
    </form>
  );
}