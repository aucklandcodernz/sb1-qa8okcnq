import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  strengths: z.array(z.string()).min(1, 'At least one strength is required'),
  weaknesses: z.array(z.string()).optional(),
  recommendation: z.enum(['HIRE', 'REJECT', 'NEXT_ROUND']),
  comments: z.string().min(10, 'Please provide detailed feedback'),
});

interface InterviewFeedbackFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function InterviewFeedbackForm({ onSubmit, onCancel }: InterviewFeedbackFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      strengths: [''],
      weaknesses: [''],
      recommendation: undefined,
      comments: '',
    },
  });

  const rating = watch('rating');

  return (
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Interview Feedback</h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue('rating', value)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    'h-8 w-8',
                    value <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  )}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Key Strengths
          </label>
          <div className="mt-2 space-y-2">
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                {...register(`strengths.${index}`)}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={`Strength ${index + 1}`}
              />
            ))}
          </div>
          {errors.strengths && (
            <p className="mt-1 text-sm text-red-600">{errors.strengths.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Areas for Improvement
          </label>
          <div className="mt-2 space-y-2">
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                {...register(`weaknesses.${index}`)}
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={`Area ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Recommendation
          </label>
          <select
            {...register('recommendation')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select recommendation</option>
            <option value="HIRE">Hire</option>
            <option value="REJECT">Reject</option>
            <option value="NEXT_ROUND">Proceed to Next Round</option>
          </select>
          {errors.recommendation && (
            <p className="mt-1 text-sm text-red-600">{errors.recommendation.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Detailed Feedback
          </label>
          <textarea
            {...register('comments')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Provide detailed feedback about the candidate's performance..."
          />
          {errors.comments && (
            <p className="mt-1 text-sm text-red-600">{errors.comments.message}</p>
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
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}