import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { systemSettingsAtom } from '../../lib/settings';
import { systemSettingsSchema } from '../../types/settings';
import { Globe, Clock, Shield } from 'lucide-react';

export default function SystemSettingsForm() {
  const [systemSettings, setSystemSettings] = useAtom(systemSettingsAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(systemSettingsSchema),
    defaultValues: systemSettings,
  });

  const onSubmit = (data: any) => {
    setSystemSettings(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-gray-400" />
          Localization
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Format
            </label>
            <select
              {...register('dateFormat')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
            {errors.dateFormat && (
              <p className="mt-1 text-sm text-red-600">{errors.dateFormat.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Format
            </label>
            <select
              {...register('timeFormat')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="12">12-hour</option>
              <option value="24">24-hour</option>
            </select>
            {errors.timeFormat && (
              <p className="mt-1 text-sm text-red-600">{errors.timeFormat.message}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-gray-400" />
          Password Policy
        </h3>
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Length
              </label>
              <input
                type="number"
                {...register('passwordPolicy.minLength')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Expiry (days)
              </label>
              <input
                type="number"
                {...register('passwordPolicy.expiryDays')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('passwordPolicy.requireNumbers')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require numbers
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('passwordPolicy.requireSpecialChars')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require special characters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('passwordPolicy.requireUppercase')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require uppercase letters
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          Session Settings
        </h3>
        <div className="mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              {...register('sessionTimeout')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
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