import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock, Plus, Minus } from 'lucide-react';
import { TimeEntry } from '../../types/timesheet';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';
import { cn } from '../../lib/utils';

const timeEntrySchema = z.object({
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  type: z.enum(['REGULAR', 'OVERTIME', 'ON_CALL', 'TRAINING']),
  projectId: z.string().optional(),
  taskId: z.string().optional(),
  description: z.string().optional(),
  breaks: z.array(z.object({
    startTime: z.string(),
    endTime: z.string(),
    type: z.enum(['REST_BREAK', 'MEAL_BREAK']),
  })),
});

interface TimesheetEntryProps {
  date: string;
  onSubmit: (entry: Partial<TimeEntry>) => void;
  defaultValues?: Partial<TimeEntry>;
  projects?: { id: string; name: string }[];
  tasks?: { id: string; name: string }[];
}

export default function TimesheetEntry({
  date,
  onSubmit,
  defaultValues,
  projects,
  tasks,
}: TimesheetEntryProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      breaks: [{ startTime: '', endTime: '', type: 'REST_BREAK' as const }],
      ...defaultValues,
    },
  });

  const breaks = watch('breaks') || [];

  const addBreak = () => {
    setValue('breaks', [...breaks, { startTime: '', endTime: '', type: 'REST_BREAK' as const }]);
  };

  const removeBreak = (index: number) => {
    setValue('breaks', breaks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 timesheet-entry">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Start Time"
          type="time"
          {...register('startTime')}
          error={errors.startTime?.message}
          leftIcon={<Clock className="h-5 w-5 text-gray-400" />}
        />

        <FormField
          label="End Time"
          type="time"
          {...register('endTime')}
          error={errors.endTime?.message}
          leftIcon={<Clock className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <FormSelect
        label="Entry Type"
        {...register('type')}
        error={errors.type?.message}
        options={[
          { value: 'REGULAR', label: 'Regular Hours' },
          { value: 'OVERTIME', label: 'Overtime' },
          { value: 'ON_CALL', label: 'On Call' },
          { value: 'TRAINING', label: 'Training' },
        ]}
      />

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

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Breaks
          </label>
          <button
            type="button"
            onClick={addBreak}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Break
          </button>
        </div>
        <div className="space-y-2">
          {breaks.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <select
                {...register(`breaks.${index}.type`)}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="REST_BREAK">Rest Break</option>
                <option value="MEAL_BREAK">Meal Break</option>
              </select>
              <input
                type="time"
                {...register(`breaks.${index}.startTime`)}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="time"
                {...register(`breaks.${index}.endTime`)}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeBreak(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <FormField
        label="Description"
        {...register('description')}
        error={errors.description?.message}
        component="textarea"
        rows={3}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}