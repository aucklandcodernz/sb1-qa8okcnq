
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { performanceReviewSchema } from "../../lib/validations/review";
import FormField from "../ui/FormField";
import type { PerformanceReview } from '../../types/performance';

interface CreateReviewFormProps {
  employeeId: string;
  onSuccess: () => void;
}

export default function CreateReviewForm({ employeeId, onSuccess }: CreateReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PerformanceReview>({
    resolver: zodResolver(performanceReviewSchema),
    defaultValues: {
      employeeId,
      reviewDate: new Date().toISOString().split('T')[0],
      rating: '',
      comments: '',
      reviewerId: '',
      status: 'DRAFT'
    }
  });

  const onSubmit = async (data: PerformanceReview) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Failed to create review');
      onSuccess();
    } catch (error) {
      console.error('Error creating review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Review Date"
        type="date"
        {...register('reviewDate')}
        error={errors.reviewDate?.message}
      />

      <FormField
        label="Rating"
        type="number"
        min="1"
        max="5"
        {...register('rating')}
        error={errors.rating?.message}
      />

      <FormField
        label="Comments"
        type="textarea"
        {...register('comments')}
        error={errors.comments?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
