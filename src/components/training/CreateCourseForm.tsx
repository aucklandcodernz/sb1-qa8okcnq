import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { createCourse } from '../../lib/training';
import { userAtom } from '../../lib/auth';

const createCourseSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  duration: z.number().min(1, 'Duration must be at least 1 hour'),
  objectives: z.array(z.string()).min(1, 'At least one objective is required'),
  instructor: z.object({
    name: z.string().min(2, 'Instructor name is required'),
    title: z.string().min(2, 'Instructor title is required'),
    bio: z.string().optional(),
  }),
});

interface CreateCourseFormProps {
  onSuccess: () => void;
}

export default function CreateCourseForm({ onSuccess }: CreateCourseFormProps) {
  const [user] = useAtom(userAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createCourseSchema),
  });

  const onSubmit = async (data: any) => {
    if (!user?.organizationId) return;

    const courseData = {
      ...data,
      organizationId: user.organizationId,
      status: 'DRAFT' as const,
      materials: [],
    };

    await createCourse(courseData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Title
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
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (hours)
          </label>
          <input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Objectives
        </label>
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              {...register(`objectives.${index}`)}
              type="text"
              placeholder={`Objective ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          ))}
        </div>
        {errors.objectives && (
          <p className="mt-1 text-sm text-red-600">{errors.objectives.message}</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-900">Instructor Information</h4>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register('instructor.name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.instructor?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.instructor.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register('instructor.title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.instructor?.title && (
              <p className="mt-1 text-sm text-red-600">{errors.instructor.title.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              {...register('instructor.bio')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Course
        </button>
      </div>
    </form>
  );
}