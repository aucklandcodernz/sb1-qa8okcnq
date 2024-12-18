import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Plus, Minus } from 'lucide-react';
import { EvaluationCriteria, RecommendationStatus } from '../../types/evaluation';
import { cn } from '../../lib/utils';

const evaluationSchema = z.object({
  ratings: z.array(z.object({
    criteria: z.enum(['TECHNICAL_SKILLS', 'COMMUNICATION', 'PROBLEM_SOLVING', 'CULTURAL_FIT', 'LEADERSHIP', 'EXPERIENCE']),
    rating: z.number().min(1).max(5),
    comments: z.string().min(1, 'Comments are required'),
  })),
  strengths: z.array(z.string()).min(1, 'At least one strength is required'),
  weaknesses: z.array(z.string()).optional(),
  overallComments: z.string().min(10, 'Please provide detailed overall comments'),
  recommendation: z.enum(['STRONG_HIRE', 'HIRE', 'NO_HIRE', 'STRONG_NO_HIRE']),
});

interface CandidateEvaluationFormProps {
  applicationId: string;
  interviewId: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const criteriaLabels: Record<EvaluationCriteria, string> = {
  TECHNICAL_SKILLS: 'Technical Skills',
  COMMUNICATION: 'Communication',
  PROBLEM_SOLVING: 'Problem Solving',
  CULTURAL_FIT: 'Cultural Fit',
  LEADERSHIP: 'Leadership',
  EXPERIENCE: 'Experience',
};

const recommendationLabels: Record<RecommendationStatus, string> = {
  STRONG_HIRE: 'Strong Hire',
  HIRE: 'Hire',
  NO_HIRE: 'No Hire',
  STRONG_NO_HIRE: 'Strong No Hire',
};

export default function CandidateEvaluationForm({
  applicationId,
  interviewId,
  onSubmit,
  onCancel,
}: CandidateEvaluationFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      ratings: Object.keys(criteriaLabels).map(criteria => ({
        criteria,
        rating: 3,
        comments: '',
      })),
      strengths: [''],
      weaknesses: [''],
      overallComments: '',
      recommendation: undefined,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit({
      applicationId,
      interviewId,
      ...data,
    });
  };

  const ratings = watch('ratings');

  return (
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Candidate Evaluation</h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {ratings.map((rating: any, index: number) => (
            <div key={rating.criteria} className="border-b border-gray-200 pb-6">
              <input type="hidden" {...register(`ratings.${index}.criteria`)} />
              
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {criteriaLabels[rating.criteria as EvaluationCriteria]}
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setValue(`ratings.${index}.rating`, value)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          'h-6 w-6',
                          value <= rating.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  {...register(`ratings.${index}.comments`)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={`Comments about ${criteriaLabels[rating.criteria as EvaluationCriteria].toLowerCase()}`}
                />
                {errors.ratings?.[index]?.comments && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ratings[index].comments?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Key Strengths
            </label>
            <div className="mt-2 space-y-2">
              {watch('strengths').map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    {...register(`strengths.${index}`)}
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Add a key strength"
                  />
                  {index === watch('strengths').length - 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const strengths = watch('strengths');
                        setValue('strengths', [...strengths, '']);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  )}
                </div>
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
              {watch('weaknesses').map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    {...register(`weaknesses.${index}`)}
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Add an area for improvement"
                  />
                  {index === watch('weaknesses').length - 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const weaknesses = watch('weaknesses');
                        setValue('weaknesses', [...weaknesses, '']);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Overall Comments
          </label>
          <textarea
            {...register('overallComments')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Provide detailed feedback about the candidate's overall performance..."
          />
          {errors.overallComments && (
            <p className="mt-1 text-sm text-red-600">{errors.overallComments.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hiring Recommendation
          </label>
          <select
            {...register('recommendation')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select recommendation</option>
            {Object.entries(recommendationLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.recommendation && (
            <p className="mt-1 text-sm text-red-600">{errors.recommendation.message}</p>
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
            Submit Evaluation
          </button>
        </div>
      </form>
    </div>
  );
}