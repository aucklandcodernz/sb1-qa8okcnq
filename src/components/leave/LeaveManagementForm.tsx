import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Clock } from 'lucide-react';
import { LeaveType } from '../../types/leave';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';
import DocumentUploader from '../ui/DocumentUploader';

const leaveManagementSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  type: z.enum(['ANNUAL', 'SICK', 'PARENTAL', 'BEREAVEMENT', 'OTHER']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  totalDays: z.number().min(0.5, 'Total days must be at least 0.5'),
  reason: z.string().min(10, 'Please provide a detailed reason'),
  documents: z.array(z.any()).optional(),
  parentalLeaveDetails: z.object({
    isPrimaryCarer: z.boolean(),
    expectedDueDate: z.string().optional(),
    partnerLeaveStart: z.string().optional(),
  }).optional(),
});

interface LeaveManagementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  employees: Array<{ id: string; name: string }>;
  currentBalance?: number;
}

const leaveTypes: { value: LeaveType; label: string }[] = [
  { value: 'ANNUAL', label: 'Annual Leave' },
  { value: 'SICK', label: 'Sick Leave' },
  { value: 'PARENTAL', label: 'Parental Leave' },
  { value: 'BEREAVEMENT', label: 'Bereavement Leave' },
  { value: 'OTHER', label: 'Other' },
];

export default function LeaveManagementForm({
  onSubmit,
  onCancel,
  employees,
  currentBalance,
}: LeaveManagementFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(leaveManagementSchema),
  });

  const leaveType = watch('type');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  React.useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setValue('totalDays', diffDays);
    }
  }, [startDate, endDate, setValue]);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Leave Application</h3>
          {currentBalance !== undefined && (
            <div className="text-sm text-gray-500">
              Available Balance: {currentBalance} days
            </div>
          )}
        </div>

        <div className="space-y-6">
          <FormSelect
            label="Employee"
            {...register('employeeId')}
            error={errors.employeeId?.message}
            options={employees.map(emp => ({
              value: emp.id,
              label: emp.name,
            }))}
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
          />

          <FormSelect
            label="Leave Type"
            {...register('type')}
            error={errors.type?.message}
            options={leaveTypes}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              label="Start Date"
              type="date"
              {...register('startDate')}
              error={errors.startDate?.message}
              leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
            />

            <FormField
              label="End Date"
              type="date"
              {...register('endDate')}
              error={errors.endDate?.message}
              leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <FormField
            label="Total Days"
            type="number"
            step="0.5"
            {...register('totalDays', { valueAsNumber: true })}
            error={errors.totalDays?.message}
            leftIcon={<Clock className="h-5 w-5 text-gray-400" />}
            readOnly
          />

          {leaveType === 'PARENTAL' && (
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('parentalLeaveDetails.isPrimaryCarer')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I am the primary carer
                </label>
              </div>

              <FormField
                label="Expected Due Date"
                type="date"
                {...register('parentalLeaveDetails.expectedDueDate')}
                error={errors.parentalLeaveDetails?.expectedDueDate?.message}
                leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
            </div>
          )}

          <FormField
            label="Reason"
            {...register('reason')}
            error={errors.reason?.message}
            component="textarea"
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supporting Documents
            </label>
            <div className="mt-1">
              <DocumentUploader
                onUpload={handleFileUpload}
                uploadedFiles={uploadedFiles.map(file => ({
                  name: file.name,
                  size: file.size,
                }))}
                onRemoveFile={handleRemoveFile}
                maxFiles={3}
                maxSize={5 * 1024 * 1024} // 5MB
                acceptedTypes={['application/pdf', 'image/*']}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {leaveType === 'SICK' && 'Medical certificate required for sick leave over 3 consecutive days'}
              {leaveType === 'BEREAVEMENT' && 'Documentation may be required to confirm relationship'}
              {leaveType === 'PARENTAL' && 'Please provide relevant documentation (e.g., medical certificate, adoption papers)'}
            </p>
          </div>
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
            Submit Application
          </button>
        </div>
      </div>
    </form>
  );
}