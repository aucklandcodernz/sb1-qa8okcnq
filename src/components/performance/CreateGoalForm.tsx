import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { performanceGoalsAtom } from '../../lib/performance';
import { userAtom } from '../../lib/auth';

const goalSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['PROFESSIONAL', 'PERSONAL', 'PROJECT']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().min(1, 'Due date is required'),
  metrics: z.array(z.string()).min(1, 'At least one metric is required'),
});

interface CreateGoalFormProps {
  onSuccess: () => void;
}

export default function CreateGoalForm({ onSuccess }: CreateGoalFormProps) {
  const [performanceGoals, setPerformanceGoals] = useAtom(performanceGoalsAtom);
  const [currentUser] = useAtom(userAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(goalSchema),
  });

  const onSubmit = (data: any) => {
    if (!currentUser) return;

    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: currentUser.id,
      description: data.description,
      category: data.category,
      status: 'NOT_STARTED' as const,
      priority: data.priority,
      dueDate: data.dueDate,
      progress: 0,
      metrics: data.metrics.filter(Boolean),
      feedback: [],
    };

    setPerformanceGoals([...performanceGoals, newGoal]);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Goal Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Describe your goal..."
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
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select category</option>
            <option value="PROFESSIONAL">Professional</option>
            <option value="PERSONAL">Personal</option>
            <option value="PROJECT">Project</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            {...register('priority')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          {...register('dueDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Success Metrics
        </label>
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              {...register(`metrics.${index}`)}
              type="text"
              placeholder={`Metric ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          ))}
        </div>
        {errors.metrics && (
          <p className="mt-1 text-sm text-red-600">{errors.metrics.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Goal
        </button>
      </div>
    </form>
  );
}