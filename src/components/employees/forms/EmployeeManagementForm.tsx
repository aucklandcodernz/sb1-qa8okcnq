import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Calendar, Clock, FileText } from 'lucide-react';
import FormField from '../../ui/FormField';
import FormSelect from '../../ui/FormSelect';
import DocumentUploader from '../documents/DocumentUploader';
import { cn } from '../../../lib/utils';

const formSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  actionType: z.enum(['LEAVE', 'TIMESHEET', 'OTHER']),
  // Leave Application Fields
  leaveDetails: z.object({
    type: z.enum(['ANNUAL', 'SICK', 'PERSONAL', 'OTHER']),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    totalDays: z.number().min(0.5, 'Total days must be at least 0.5'),
    reason: z.string().min(10, 'Please provide a detailed reason'),
  }).optional(),
  // Timesheet Fields
  timesheetDetails: z.object({
    periodStart: z.string().min(1, 'Start date is required'),
    periodEnd: z.string().min(1, 'End date is required'),
    dailyHours: z.array(z.object({
      date: z.string(),
      hours: z.number().min(0),
      overtime: z.number().min(0),
      projectCode: z.string().optional(),
    })),
  }).optional(),
  // Approval Fields
  supervisorId: z.string().min(1, 'Supervisor is required'),
  supervisorName: z.string().min(1, 'Supervisor name is required'),
  comments: z.string().optional(),
}).refine(data => {
  if (data.actionType === 'LEAVE') {
    return !!data.leaveDetails;
  }
  if (data.actionType === 'TIMESHEET') {
    return !!data.timesheetDetails;
  }
  return true;
}, {
  message: "Required details missing for selected action type",
  path: ["actionType"],
});

interface EmployeeManagementFormProps {
  onSubmit: (data: any) => void;
  departments: Array<{ id: string; name: string }>;
  supervisors: Array<{ id: string; name: string }>;
  defaultValues?: any;
}

export default function EmployeeManagementForm({
  onSubmit,
  departments,
  supervisors,
  defaultValues,
}: EmployeeManagementFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const actionType = watch('actionType');
  const leaveStartDate = watch('leaveDetails.startDate');
  const leaveEndDate = watch('leaveDetails.endDate');

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const calculateTotalDays = () => {
    if (leaveStartDate && leaveEndDate) {
      const start = new Date(leaveStartDate);
      const end = new Date(leaveEndDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setValue('leaveDetails.totalDays', diffDays);
    }
  };

  React.useEffect(() => {
    calculateTotalDays();
  }, [leaveStartDate, leaveEndDate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Employee Information */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Employee Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            label="Employee ID"
            {...register('employeeId')}
            error={errors.employeeId?.message}
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
          />

          <FormField
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
          />

          <FormField
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
          />

          <FormSelect
            label="Department"
            {...register('department')}
            error={errors.department?.message}
            options={departments.map(dept => ({
              value: dept.id,
              label: dept.name,
            }))}
          />

          <FormField
            label="Position"
            {...register('position')}
            error={errors.position?.message}
          />
        </div>
      </div>

      {/* Action Type Selection */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Action Type</h3>
        <FormSelect
          label="Select Action"
          {...register('actionType')}
          error={errors.actionType?.message}
          options={[
            { value: 'LEAVE', label: 'Leave Application' },
            { value: 'TIMESHEET', label: 'Timesheet Submission' },
            { value: 'OTHER', label: 'Other HR Documentation' },
          ]}
        />
      </div>

      {/* Action-specific Forms */}
      {actionType === 'LEAVE' && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Leave Application</h3>
          <div className="space-y-6">
            <FormSelect
              label="Leave Type"
              {...register('leaveDetails.type')}
              error={errors.leaveDetails?.type?.message}
              options={[
                { value: 'ANNUAL', label: 'Annual Leave' },
                { value: 'SICK', label: 'Sick Leave' },
                { value: 'PERSONAL', label: 'Personal Leave' },
                { value: 'OTHER', label: 'Other' },
              ]}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                label="Start Date"
                type="date"
                {...register('leaveDetails.startDate')}
                error={errors.leaveDetails?.startDate?.message}
                leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
              />

              <FormField
                label="End Date"
                type="date"
                {...register('leaveDetails.endDate')}
                error={errors.leaveDetails?.endDate?.message}
                leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
            </div>

            <FormField
              label="Total Days"
              type="number"
              step="0.5"
              {...register('leaveDetails.totalDays', { valueAsNumber: true })}
              error={errors.leaveDetails?.totalDays?.message}
              readOnly
            />

            <FormField
              label="Reason"
              {...register('leaveDetails.reason')}
              error={errors.leaveDetails?.reason?.message}
              component="textarea"
              rows={4}
            />
          </div>
        </div>
      )}

      {actionType === 'TIMESHEET' && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Timesheet Submission</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                label="Period Start"
                type="date"
                {...register('timesheetDetails.periodStart')}
                error={errors.timesheetDetails?.periodStart?.message}
                leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
              />

              <FormField
                label="Period End"
                type="date"
                {...register('timesheetDetails.periodEnd')}
                error={errors.timesheetDetails?.periodEnd?.message}
                leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
            </div>

            {/* Daily Hours Input */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Daily Hours</h4>
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <FormField
                    label={`Day ${index + 1}`}
                    type="number"
                    step="0.5"
                    {...register(`timesheetDetails.dailyHours.${index}.hours`, { valueAsNumber: true })}
                    error={errors.timesheetDetails?.dailyHours?.[index]?.hours?.message}
                    leftIcon={<Clock className="h-5 w-5 text-gray-400" />}
                  />

                  <FormField
                    label="Overtime Hours"
                    type="number"
                    step="0.5"
                    {...register(`timesheetDetails.dailyHours.${index}.overtime`, { valueAsNumber: true })}
                    error={errors.timesheetDetails?.dailyHours?.[index]?.overtime?.message}
                  />

                  <FormField
                    label="Project Code"
                    {...register(`timesheetDetails.dailyHours.${index}.projectCode`)}
                    error={errors.timesheetDetails?.dailyHours?.[index]?.projectCode?.message}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Supporting Documents */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Supporting Documents</h3>
        <DocumentUploader
          onUpload={handleFileUpload}
          uploadedFiles={uploadedFiles.map(file => ({
            name: file.name,
            size: file.size,
          }))}
          onRemoveFile={handleRemoveFile}
        />
      </div>

      {/* Approval Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Approval</h3>
        <div className="space-y-6">
          <FormSelect
            label="Supervisor"
            {...register('supervisorId')}
            error={errors.supervisorId?.message}
            options={supervisors.map(supervisor => ({
              value: supervisor.id,
              label: supervisor.name,
            }))}
          />

          <FormField
            label="Comments"
            {...register('comments')}
            error={errors.comments?.message}
            component="textarea"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Draft
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}