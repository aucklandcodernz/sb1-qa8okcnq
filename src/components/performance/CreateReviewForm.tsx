
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { performanceReviewSchema } from '../../lib/validations/review';
import type { CreateReviewInput } from '../../lib/validations/review';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

interface CreateReviewFormProps {
  employeeId: string;
  onSuccess: () => void;
}

export default function CreateReviewForm({ employeeId, onSuccess }: CreateReviewFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateReviewInput>({
    resolver: zodResolver(performanceReviewSchema),
    defaultValues: {
      employeeId,
      reviewDate: new Date(),
      status: 'DRAFT',
      category: 'ANNUAL',
      improvement: []
    }
  });

  const onSubmit = async (data: CreateReviewInput) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to create review');
      
      onSuccess();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormSelect
        label="Category"
        {...register('category')}
        error={errors.category?.message}
        options={[
          { value: 'ANNUAL', label: 'Annual Review' },
          { value: 'QUARTERLY', label: 'Quarterly Review' },
          { value: 'PROBATION', label: 'Probation Review' },
          { value: 'PROJECT', label: 'Project Review' },
        ]}
      />
      
      <FormField
        label="Rating"
        type="number"
        min={1}
        max={5}
        {...register('rating', { valueAsNumber: true })}
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
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Create Review
      </button>
    </form>
  );
}
