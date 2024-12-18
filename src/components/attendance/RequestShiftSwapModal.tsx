import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';

const shiftSwapSchema = z.object({
  recipientId: z.string().min(1, 'Recipient is required'),
  shiftDate: z.string().min(1, 'Shift date is required'),
  notes: z.string().optional(),
});

interface RequestShiftSwapModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  currentShift: {
    date: string;
    startTime: string;
    endTime: string;
  };
}

export default function RequestShiftSwapModal({
  onClose,
  onSubmit,
  currentShift,
}: RequestShiftSwapModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shiftSwapSchema),
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Request Shift Swap</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Shift
            </label>
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(currentShift.date), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Clock className="h-4 w-4 mr-2" />
                {currentShift.startTime} - {currentShift.endTime}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Swap With
            </label>
            <div className="mt-1">
              <select
                {...register('recipientId')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select employee</option>
                <option value="emp2">Jane Doe</option>
                <option value="emp3">Bob Smith</option>
              </select>
              {errors.recipientId && (
                <p className="mt-1 text-sm text-red-600">{errors.recipientId.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Request Swap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}