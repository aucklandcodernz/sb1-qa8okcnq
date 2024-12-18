import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Video, MapPin } from 'lucide-react';

const scheduleInterviewSchema = z.object({
  scheduledAt: z.string().min(1, 'Interview date and time is required'),
  type: z.enum(['PHONE', 'VIDEO', 'IN_PERSON']),
  interviewers: z.array(z.string()).min(1, 'At least one interviewer is required'),
  location: z.string().optional(),
  virtualMeetingUrl: z.string().optional(),
});

interface ScheduleInterviewFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ScheduleInterviewForm({ onSubmit, onCancel }: ScheduleInterviewFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(scheduleInterviewSchema),
  });

  const interviewType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Schedule Interview</h3>
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
          Date and Time
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="datetime-local"
            {...register('scheduledAt')}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.scheduledAt && (
          <p className="mt-1 text-sm text-red-600">{errors.scheduledAt.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Interview Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select type</option>
          <option value="PHONE">Phone Interview</option>
          <option value="VIDEO">Video Interview</option>
          <option value="IN_PERSON">In-Person Interview</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {interviewType === 'IN_PERSON' && (
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
              placeholder="Office address or room number"
            />
          </div>
        </div>
      )}

      {interviewType === 'VIDEO' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Virtual Meeting URL
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
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Interviewers
        </label>
        <div className="mt-2 space-y-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              {...register(`interviewers.${index}`)}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={`Interviewer ${index + 1}`}
            />
          ))}
        </div>
        {errors.interviewers && (
          <p className="mt-1 text-sm text-red-600">{errors.interviewers.message}</p>
        )}
      </div>

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
          Schedule Interview
        </button>
      </div>
    </form>
  );
}