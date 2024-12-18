import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

const timesheetSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  projectId: z.string().optional(),
  taskId: z.string().optional(),
  description: z.string().optional(),
});

interface TimesheetFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  projects?: { id: string; name: string }[];
  tasks?: { id: string; name: string }[];
}

export default function TimesheetForm({
  onSubmit,
  onCancel,
  projects,
  tasks,
}: TimesheetFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(timesheetSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Date"
        type="date"
        {...register('date')}
        error={errors.date?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Start Time"
          type="time"
          {...register('startTime')}
          error={errors.startTime?.message}
        />

        <FormField
          label="End Time"
          type="time"
          {...register('endTime')}
          error={errors.endTime?.message}
        />
      </div>

      {projects && (
        <FormSelect
          label="Project"
          {...register('projectId')}
          error={errors.projectId?.message}
          options={projects.map(p => ({ value: p.id, label: p.name }))}
        />
      )}

      {tasks && (
        <FormSelect
          label="Task"
          {...register('taskId')}
          error={errors.taskId?.message}
          options={tasks.map(t => ({ value: t.id, label: t.name }))}
        />
      )}

      <FormField
        label="Description"
        {...register('description')}
        error={errors.description?.message}
        component="textarea"
        rows={3}
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Submit Timesheet
        </button>
      </div>
    </form>
  );
}