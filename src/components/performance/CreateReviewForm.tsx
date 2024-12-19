import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewSchema } from '../../lib/validations/review';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';

const createReview = async (data: any) => {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create review');
  return response.json();
};
import { z } from 'zod';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { toast } from 'react-hot-toast';

const reviewSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  reviewerId: z.string().min(1, 'Reviewer is required'),
  reviewDate: z.string(),
  rating: z.number().min(1).max(5),
  comments: z.string().optional(),
  goals: z.object({}).passthrough().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function CreateReviewForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema)
  });

  const createReview = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create review');
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    createReview.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Employee"
        error={errors.employeeId?.message}
        required
      >
        <input
          type="text"
          {...register('employeeId')}
          className="w-full p-2 border rounded"
        />
      </FormField>

      <FormField
        label="Reviewer"
        error={errors.reviewerId?.message}
        required
      >
        <input
          type="text"
          {...register('reviewerId')}
          className="w-full p-2 border rounded"
        />
      </FormField>

      <FormField
        label="Review Date"
        error={errors.reviewDate?.message}
        required
      >
        <input
          type="date"
          {...register('reviewDate')}
          className="w-full p-2 border rounded"
        />
      </FormField>

      <FormField
        label="Rating"
        error={errors.rating?.message}
        required
      >
        <input
          type="number"
          min="1"
          max="5"
          {...register('rating', { valueAsNumber: true })}
          className="w-full p-2 border rounded"
        />
      </FormField>

      <FormField
        label="Comments"
        error={errors.comments?.message}
      >
        <textarea
          {...register('comments')}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </FormField>

      <Button type="submit" disabled={createReview.isPending}>
        {createReview.isPending ? 'Creating...' : 'Create Review'}
      </Button>
    </form>
  );
}