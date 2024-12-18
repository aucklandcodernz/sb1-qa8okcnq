```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Baby, Clock } from 'lucide-react';
import { ParentalLeaveType } from '../../types/leave';
import { PARENTAL_LEAVE_ENTITLEMENTS } from '../../lib/leave/parental';

const parentalLeaveSchema = z.object({
  type: z.enum(['PRIMARY', 'PARTNER', 'EXTENDED']),
  startDate: z.string().min(1, 'Start date is required'),
  expectedDueDate: z.string().min(1, 'Expected due date is required'),
  childBirthDate: z.string().optional(),
  isAdoption: z.boolean(),
  adoptionDate: z.string().optional(),
  reason: z.string().min(10, 'Please provide a detailed reason'),
});

interface ParentalLeaveFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  eligibility: {
    isPrimaryEligible: boolean;
    isPartnerEligible: boolean;
    primaryEntitlementWeeks: number;
    partnerEntitlementWeeks: number;
    extendedLeaveWeeks: number;
    issues: string[];
  };
}

const leaveTypes: { value: ParentalLeaveType; label: string }[] = [
  { value: 'PRIMARY', label: 'Primary Carer Leave' },
  { value: 'PARTNER', label: 'Partner Leave' },
  { value: 'EXTENDED', label: 'Extended Leave' },
];

export default function ParentalLeaveForm({
  onSubmit,
  onCancel,
  eligibility,
}: ParentalLeaveFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(parentalLeaveSchema),
  });

  const isAdoption = watch('isAdoption');
  const selectedType = watch('type');

  const getEntitlementWeeks = (type: ParentalLeaveType) => {
    switch (type) {
      case 'PRIMARY':
        return eligibility.primaryEntitlementWeeks;
      case 'PARTNER':
        return eligibility.partnerEntitlementWeeks;
      case 'EXTENDED':
        return eligibility.extendedLeaveWeeks;
      default:
        return 0;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Baby className="h-5 w-5 mr-2 text-gray-400" />
          Request Parental Leave
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>

      {eligibility.issues.length > 0 && (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Eligibility Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  {eligibility.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Leave Type
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select leave type</option>
          {leaveTypes.map((type) => {
            const weeks = getEntitlementWeeks(type.value);
            const isEligible = weeks > 0;
            return (
              <option
                key={type.value}
                value={type.value}
                disabled={!isEligible}
              >
                {type.label} ({weeks} weeks)
              </option>
            );
          })}
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('startDate')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Due Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('expectedDueDate')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {errors.expectedDueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expectedDueDate.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('isAdoption')}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          This is for adoption
        </label>
      </div>

      {isAdoption && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Adoption Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('adoptionDate')}
              className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Information
        </label>
        <textarea
          {...register('reason')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Please provide any additional information..."
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      {selectedType && (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Leave Entitlement
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  You are entitled to {getEntitlementWeeks(selectedType as ParentalLeaveType)} weeks
                  of {selectedType.toLowerCase()} parental leave.
                </p>
                {selectedType === 'PRIMARY' && (
                  <p className="mt-1">
                    You may be eligible for paid parental leave through the government.
                  </p>
                )}
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
          Submit Request
        </button>
      </div>
    </form>
  );
}
```