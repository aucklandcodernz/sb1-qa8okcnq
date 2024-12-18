import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star } from 'lucide-react';
import { FeedbackQuestion } from '../../types/feedback';
import { cn } from '../../lib/utils';

const feedbackResponseSchema = z.object({
  responses: z.array(z.object({
    questionId: z.string(),
    rating: z.number().optional(),
    comment: z.string().min(1, 'Response is required'),
  })),
});

interface FeedbackFormProps {
  questions: FeedbackQuestion[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function FeedbackForm({ questions, onSubmit, onCancel }: FeedbackFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(feedbackResponseSchema),
    defaultValues: {
      responses: questions.map(q => ({
        questionId: q.id,
        rating: q.type === 'RATING' ? 3 : undefined,
        comment: '',
      })),
    },
  });

  const responses = watch('responses');

  const handleRatingClick = (questionIndex: number, rating: number) => {
    setValue(`responses.${questionIndex}.rating`, rating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className="border-b border-gray-200 pb-6">
          <input
            type="hidden"
            {...register(`responses.${index}.questionId`)}
            value={question.id}
          />

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900">
              {question.category}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              {question.question}
            </p>
          </div>

          {question.type === 'RATING' && (
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(index, rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={cn(
                      'h-6 w-6',
                      rating <= (responses[index]?.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    )}
                  />
                </button>
              ))}
            </div>
          )}

          <div>
            <textarea
              {...register(`responses.${index}.comment`)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Provide your feedback..."
            />
            {errors.responses?.[index]?.comment && (
              <p className="mt-1 text-sm text-red-600">
                {errors.responses[index].comment?.message}
              </p>
            )}
          </div>
        </div>
      ))}

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
  );
}