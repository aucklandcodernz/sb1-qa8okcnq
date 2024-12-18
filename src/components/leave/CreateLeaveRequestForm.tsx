import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { leaveRequestsAtom } from '../../lib/leave';
import { userAtom } from '../../lib/auth';
import { CreateLeaveRequestData, LeaveType } from '../../types/leave';

const createLeaveRequestSchema = z.object({
  type: z.enum(['ANNUAL', 'SICK', 'PARENTAL', 'BEREAVEMENT', 'OTHER']),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().min(10, 'Please provide a detailed reason'),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

interface CreateLeaveRequestFormProps {
  onSuccess: () => void;
}

const leaveTypes: { value: LeaveType; label: string }[] = [
  { value: 'ANNUAL', label: 'Annual Leave' },
  { value: 'SICK', label: 'Sick Leave' },
  { value: 'PARENTAL', label: 'Parental Leave' },
  { value: 'BEREAVEMENT', label: 'Bereavement Leave' },
  { value: 'OTHER', label: 'Other' },
];

export default function CreateLeaveRequestForm({ onSuccess }: CreateLeaveRequestFormProps) {
  const [leaveRequests, setLeaveRequests] = useAtom(leaveRequestsAtom);
  const [user] = useAtom(userAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateLeaveRequestData>({
    resolver: zodResolver(createLeaveRequestSchema),
  });

  const onSubmit = (data: CreateLeaveRequestData) => {
    if (!user) return;

    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: user.id,
      type: data.type,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      reason: data.reason,
      status: 'PENDING' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Leave Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select leave type</option>
          {leaveTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            {...register('startDate')}
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            {...register('endDate')}
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason
        </label>
        <textarea
          {...register('reason')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Please provide a detailed reason for your leave request"
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}