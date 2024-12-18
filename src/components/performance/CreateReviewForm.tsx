import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { performanceReviewsAtom } from '../../lib/performance';
import { userAtom } from '../../lib/auth';
import { ReviewType, RatingScale } from '../../types/performance';

const reviewSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  type: z.enum(['ANNUAL', 'QUARTERLY', 'PROBATION', 'PROJECT']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  ratings: z.array(z.object({
    category: z.string(),
    rating: z.number().min(1).max(5),
    comments: z.string(),
  })),
  comments: z.string().min(10, 'Please provide detailed comments'),
});

interface CreateReviewFormProps {
  onSuccess: () => void;
}

const reviewTypes: { value: ReviewType; label: string }[] = [
  { value: 'ANNUAL', label: 'Annual Review' },
  { value: 'QUARTERLY', label: 'Quarterly Review' },
  { value: 'PROBATION', label: 'Probation Review' },
  { value: 'PROJECT', label: 'Project Review' },
];

const ratingCategories = [
  'Job Knowledge',
  'Quality of Work',
  'Communication',
  'Initiative',
  'Teamwork',
  'Leadership',
];

export default function CreateReviewForm({ onSuccess }: CreateReviewFormProps) {
  const [performanceReviews, setPerformanceReviews] = useAtom(performanceReviewsAtom);
  const [user] = useAtom(userAtom);
  const canReviewOthers = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      employeeId: canReviewOthers ? '' : user?.id,
      ratings: ratingCategories.map(category => ({
        category,
        rating: 3,
        comments: '',
      })),
    },
  });

  const onSubmit = (data: any) => {
    if (!user) return;

    const overallRating = Math.round(
      data.ratings.reduce((acc: number, curr: any) => acc + curr.rating, 0) / data.ratings.length
    ) as RatingScale;

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: data.employeeId,
      reviewerId: user.id,
      type: data.type,
      period: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
      status: 'PENDING' as const,
      ratings: data.ratings,
      goals: [],
      overallRating,
      strengths: [],
      improvements: [],
      comments: data.comments,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPerformanceReviews([...performanceReviews, newReview]);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Performance Ratings</h4>
        {ratingCategories.map((category, index) => (
          <div key={category} className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                {category}
              </label>
              <select
                {...register(`ratings.${index}.rating`)}
                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} - {rating === 1 ? 'Poor' : rating === 5 ? 'Excellent' : ''}
                  </option>
                ))}
              </select>
            </div>
            <input type="hidden" {...register(`ratings.${index}.category`)} value={category} />
            <textarea
              {...register(`ratings.${index}.comments`)}
              rows={2}
              placeholder="Add comments..."
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Overall Comments
        </label>
        <textarea
          {...register('comments')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Provide overall feedback and recommendations..."
        />
        {errors.comments && (
          <p className="mt-1 text-sm text-red-600">{errors.comments.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Review
        </button>
      </div>
    </form>
  );
}