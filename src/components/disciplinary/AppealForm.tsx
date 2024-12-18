import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Scale, AlertTriangle } from 'lucide-react';

const appealSchema = z.object({
  reason: z.string().min(10, 'Appeal reason must be at least 10 characters'),
  evidence: z.array(z.any()).optional(),
  additionalComments: z.string().optional(),
  acknowledgment: z.boolean().refine(val => val === true, {
    message: 'You must acknowledge this statement',
  }),
});

interface AppealFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  deadline?: string;
}

export default function AppealForm({
  onSubmit,
  onCancel,
  deadline,
}: AppealFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(appealSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Scale className="h-5 w-5 mr-2 text-gray-400" />
          File Appeal
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>

      {deadline && (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Appeal Deadline
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Your appeal must be submitted by {deadline}. Appeals submitted after this date may not be considered.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reason for Appeal
        </label>
        <textarea
          {...register('reason')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Please provide detailed reasons for your appeal..."
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Supporting Evidence
        </label>
        <input
          type="file"
          multiple
          {...register('evidence')}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <p className="mt-1 text-xs text-gray-500">
          You may upload relevant documents to support your appeal
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Comments
        </label>
        <textarea
          {...register('additionalComments')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Any additional information you would like to provide..."
        />
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            {...register('acknowledgment')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label className="font-medium text-gray-700">
            Acknowledgment
          </label>
          <p className="text-gray-500">
            I confirm that all information provided in this appeal is true and accurate to the best of my knowledge.
          </p>
          {errors.acknowledgment && (
            <p className="mt-1 text-sm text-red-600">{errors.acknowledgment.message}</p>
          )}
        </div>
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
          Submit Appeal
        </button>
      </div>
    </form>
  );
}