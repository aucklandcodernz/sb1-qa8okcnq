import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { organizationSettingsAtom } from '../../lib/settings';
import { organizationSettingsSchema } from '../../types/settings';
import { Clock, Calendar, Users } from 'lucide-react';

interface OrganizationSettingsFormProps {
  organizationId?: string;
}

export default function OrganizationSettingsForm({ organizationId }: OrganizationSettingsFormProps) {
  const [organizationSettings, setOrganizationSettings] = useAtom(organizationSettingsAtom);

  if (!organizationId) {
    return (
      <div className="text-center text-gray-500">
        No organization selected
      </div>
    );
  }

  const settings = organizationSettings[organizationId];
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(organizationSettingsSchema),
    defaultValues: {
      workingHours: settings?.workingHours,
      leavePolicy: settings?.leavePolicy,
      approvalChain: settings?.approvalChain,
    },
  });

  const onSubmit = (data: any) => {
    setOrganizationSettings({
      ...organizationSettings,
      [organizationId]: {
        ...settings,
        ...data,
      },
    });
  };

  const workDays = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          Working Hours
        </h3>
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                {...register('workingHours.start')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                {...register('workingHours.end')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Days
            </label>
            <div className="space-y-2">
              {workDays.map((day) => (
                <div key={day.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={day.value}
                    {...register('workingHours.workDays')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    {day.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Leave Policy
        </h3>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Annual Leave Quota
            </label>
            <input
              type="number"
              {...register('leavePolicy.annualLeaveQuota')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sick Leave Quota
            </label>
            <input
              type="number"
              {...register('leavePolicy.sickLeaveQuota')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carry Over Limit
            </label>
            <input
              type="number"
              {...register('leavePolicy.carryOverLimit')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Notice Days
            </label>
            <input
              type="number"
              {...register('leavePolicy.minNoticeDays')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Users className="h-5 w-5 mr-2 text-gray-400" />
          Approval Chain
        </h3>
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Requests Approval Chain
            </label>
            <select
              multiple
              {...register('approvalChain.leaveRequests')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="SUPERVISOR">Supervisor</option>
              <option value="DEPT_MANAGER">Department Manager</option>
              <option value="HR_MANAGER">HR Manager</option>
              <option value="ORG_ADMIN">Organization Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expenses Approval Chain
            </label>
            <select
              multiple
              {...register('approvalChain.expenses')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="SUPERVISOR">Supervisor</option>
              <option value="DEPT_MANAGER">Department Manager</option>
              <option value="HR_MANAGER">HR Manager</option>
              <option value="ORG_ADMIN">Organization Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Off Approval Chain
            </label>
            <select
              multiple
              {...register('approvalChain.timeoff')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="SUPERVISOR">Supervisor</option>
              <option value="DEPT_MANAGER">Department Manager</option>
              <option value="HR_MANAGER">HR Manager</option>
              <option value="ORG_ADMIN">Organization Admin</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}