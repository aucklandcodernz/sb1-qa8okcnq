import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { createJobPosting } from '../../lib/recruitment';
import { userAtom } from '../../lib/auth';

const createJobSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is required'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']),
  location: z.string().min(2, 'Location is required'),
  salary: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string(),
  }).optional(),
  benefits: z.array(z.string()),
  closingDate: z.string().optional(),
});

interface CreateJobPostingFormProps {
  onSuccess: () => void;
}

export default function CreateJobPostingForm({ onSuccess }: CreateJobPostingFormProps) {
  const [user] = useAtom(userAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = async (data: any) => {
    if (!user?.organizationId) return;

    const jobData = {
      ...data,
      organizationId: user.organizationId,
      departmentId: user.departmentId || 'd1',
      status: 'DRAFT' as const,
    };

    await createJobPosting(jobData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select type</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERN">Intern</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              {...register(`requirements.${index}`)}
              type="text"
              placeholder={`Requirement ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          ))}
        </div>
        {errors.requirements && (
          <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Responsibilities
        </label>
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              {...register(`responsibilities.${index}`)}
              type="text"
              placeholder={`Responsibility ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          ))}
        </div>
        {errors.responsibilities && (
          <p className="mt-1 text-sm text-red-600">{errors.responsibilities.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Salary Range (Optional)
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="number"
              {...register('salary.min', { valueAsNumber: true })}
              placeholder="Min"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <input
              type="number"
              {...register('salary.max', { valueAsNumber: true })}
              placeholder="Max"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <select
              {...register('salary.currency')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Benefits
        </label>
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              {...register(`benefits.${index}`)}
              type="text"
              placeholder={`Benefit ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Closing Date (Optional)
        </label>
        <input
          type="date"
          {...register('closingDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Job Posting
        </button>
      </div>
    </form>
  );
}