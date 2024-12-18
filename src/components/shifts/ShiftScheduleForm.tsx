```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock } from 'lucide-react';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

const shiftScheduleSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  shiftType: z.enum(['REGULAR', 'NIGHT', 'FLEXIBLE', 'CUSTOM']),
  isWorkingDay: z.boolean(),
  breakDuration: z.number().min(0),
  flexibleHours: z.object({
    minHours: z.number().optional(),
    coreStartTime: z.string().optional(),
    coreEndTime: z.string().optional(),
  }).optional(),
});

interface ShiftScheduleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: any;
}

export default function ShiftScheduleForm({
  onSubmit,
  onCancel,
  defaultValues,
}: ShiftScheduleFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(shiftScheduleSchema),
    defaultValues: {
      isWorkingDay: true,
      breakDuration: 60,
      ...defaultValues,
    },
  });

  const shiftType = watch('shiftType');
  const isWorkingDay = watch('isWorkingDay');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            Schedule Shift
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isWorkingDay')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Working Day
            </label>
          </div>

          {isWorkingDay && (
            <>
              <FormSelect
                label="Day of Week"
                {...register('dayOfWeek', { valueAsNumber: true })}
                error={errors.dayOfWeek?.message}
                options={[
                  { value: '0', label: 'Sunday' },
                  { value: '1', label: 'Monday' },
                  { value: '2', label: 'Tuesday' },
                  { value: '3', label: 'Wednesday' },
                  { value: '4', label: 'Thursday' },
                  { value: '5', label: 'Friday' },
                  { value: '6', label: 'Saturday' },
                ]}
              />

              <FormSelect
                label="Shift Type"
                {...register('shiftType')}
                error={errors.shiftType?.message}
                options={[
                  { value: 'REGULAR', label: 'Regular' },
                  { value: 'NIGHT', label: 'Night Shift' },
                  { value: 'FLEXIBLE', label: 'Flexible Hours' },
                  { value: 'CUSTOM', label: 'Custom' },
                ]}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

              <FormField
                label="Break Duration (minutes)"
                type="number"
                {...register('breakDuration', { valueAsNumber: true })}
                error={errors.breakDuration?.message}
              />

              {shiftType === 'FLEXIBLE' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Flexible Hours Settings</h4>
                  <FormField
                    label="Minimum Hours"
                    type="number"
                    {...register('flexibleHours.minHours', { valueAsNumber: true })}
                    error={errors.flexibleHours?.minHours?.message}
                  />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      label="Core Hours Start"
                      type="time"
                      {...register('flexibleHours.coreStartTime')}
                      error={errors.flexibleHours?.coreStartTime?.message}
                    />

                    <FormField
                      label="Core Hours End"
                      type="time"
                      {...register('flexibleHours.coreEndTime')}
                      error={errors.flexibleHours?.coreEndTime?.message}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </form>
  );
}
```