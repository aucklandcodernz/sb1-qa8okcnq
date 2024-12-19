
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { performanceReviewSchema } from '../../lib/validations/review';
import FormField from '../ui/FormField';
import { toast, Toaster } from 'react-hot-toast';

export default function CreateReviewForm({ employeeId, onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(performanceReviewSchema),
    defaultValues: {
      employeeId,
      status: 'DRAFT',
      acknowledgement: false,
      competencies: {},
      developmentPlans: {},
      achievements: {}
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }

      toast.success('Review created successfully');
      onSuccess?.();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Rating"
          type="number"
          {...register('rating')}
          error={errors.rating?.message}
        />

        <FormField
          label="Department"
          type="text"
          {...register('department')}
          error={errors.department?.message}
        />

        <FormField
          label="Overall Performance"
          as="select"
          {...register('overallPerformance')}
          error={errors.overallPerformance?.message}
        >
          <option value="">Select Performance Level</option>
          <option value="EXCELLENT">Excellent</option>
          <option value="GOOD">Good</option>
          <option value="SATISFACTORY">Satisfactory</option>
          <option value="NEEDS_IMPROVEMENT">Needs Improvement</option>
          <option value="UNSATISFACTORY">Unsatisfactory</option>
        </FormField>

        <FormField
          label="Comments"
          as="textarea"
          {...register('comments')}
          error={errors.comments?.message}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Review
        </button>
      </form>
    </>
  );
}
