import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Users, MapPin, Video } from 'lucide-react';
import { SafetyTrainingType } from '../../types/safety';
import { cn } from '../../lib/utils';

const trainingSchema = z.object({
  type: z.enum(['INDUCTION', 'FIRST_AID', 'FIRE_SAFETY', 'HAZARD', 'MANUAL_HANDLING', 'EMERGENCY_RESPONSE']),
  scheduledDate: z.string().min(1, 'Date and time is required'),
  instructor: z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Instructor name is required'),
    qualification: z.string().optional(),
  }).optional(),
  location: z.string().optional(),
  virtualMeetingUrl: z.string().optional(),
  maxParticipants: z.number().min(1, 'Maximum participants is required'),
  notes: z.string().optional(),
});

interface SafetyTrainingSchedulerProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: {
    type?: SafetyTrainingType;
    scheduledDate?: string;
  };
}

const trainingTypes = [
  { value: 'INDUCTION', label: 'Safety Induction', validityMonths: 0 },
  { value: 'FIRST_AID', label: 'First Aid', validityMonths: 24 },
  { value: 'FIRE_SAFETY', label: 'Fire Safety', validityMonths: 12 },
  { value: 'HAZARD', label: 'Hazard Management', validityMonths: 12 },
  { value: 'MANUAL_HANDLING', label: 'Manual Handling', validityMonths: 24 },
  { value: 'EMERGENCY_RESPONSE', label: 'Emergency Response', validityMonths: 12 },
];

export default function SafetyTrainingScheduler({
  onSubmit,
  onCancel,
  defaultValues,
}: SafetyTrainingSchedulerProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      ...defaultValues,
      maxParticipants: 10,
    },
  });

  const selectedType = watch('type');
  const selectedTraining = trainingTypes.find(t => t.value === selectedType);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Schedule Safety Training</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Training Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select training type</option>
          {trainingTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
              {type.validityMonths > 0 && ` (Valid for ${type.validityMonths} months)`}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date and Time
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="datetime-local"
            {...register('scheduledDate')}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.scheduledDate && (
          <p className="mt-1 text-sm text-red-600">{errors.scheduledDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Instructor Details
        </label>
        <div className="mt-1 space-y-2">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('instructor.name')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Instructor name"
            />
          </div>
          <input
            type="text"
            {...register('instructor.qualification')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Qualifications (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('location')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Training location"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Virtual Meeting URL (Optional)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Video className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('virtualMeetingUrl')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://meet.example.com/..."
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Participants
        </label>
        <input
          type="number"
          {...register('maxParticipants', { valueAsNumber: true })}
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.maxParticipants && (
          <p className="mt-1 text-sm text-red-600">{errors.maxParticipants.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Any additional information or requirements..."
        />
      </div>

      {selectedTraining && (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Training Information
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  {selectedTraining.validityMonths > 0 ? (
                    <>
                      This certification will be valid for {selectedTraining.validityMonths} months
                      from the completion date.
                    </>
                  ) : (
                    'This is a one-time training with no expiry date.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
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
          Schedule Training
        </button>
      </div>
    </form>
  );
}