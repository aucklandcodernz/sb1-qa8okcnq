import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { performanceReviewSchema } from '../../lib/validations/review';
import FormField from '../ui/FormField';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function CreateReviewForm({ employeeId, onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(performanceReviewSchema),
    defaultValues: {
      employeeId,
      metrics: [],
      acknowledgement: false
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