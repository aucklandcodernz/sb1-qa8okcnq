import React from 'react';
import { useAtom } from 'jotai';
import { systemSettingsAtom } from '../../lib/settings';
import { Shield, Key, Lock, UserCheck } from 'lucide-react';

export default function SecuritySettings() {
  const [systemSettings, setSystemSettings] = useAtom(systemSettingsAtom);

  const handlePasswordPolicyChange = (field: string, value: any) => {
    setSystemSettings({
      ...systemSettings,
      passwordPolicy: {
        ...systemSettings.passwordPolicy,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-gray-400" />
          Security Settings
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure security settings and password policies
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-900 flex items-center">
            <Key className="h-4 w-4 mr-2 text-gray-400" />
            Password Requirements
          </h4>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={systemSettings.passwordPolicy.requireNumbers}
                onChange={(e) => handlePasswordPolicyChange('requireNumbers', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require at least one number
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={systemSettings.passwordPolicy.requireSpecialChars}
                onChange={(e) => handlePasswordPolicyChange('requireSpecialChars', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require special characters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={systemSettings.passwordPolicy.requireUppercase}
                onChange={(e) => handlePasswordPolicyChange('requireUppercase', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Require uppercase letters
              </label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 flex items-center">
            <Lock className="h-4 w-4 mr-2 text-gray-400" />
            Password Policy
          </h4>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Password Length
              </label>
              <input
                type="number"
                value={systemSettings.passwordPolicy.minLength}
                onChange={(e) => handlePasswordPolicyChange('minLength', parseInt(e.target.value))}
                min="8"
                max="32"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={systemSettings.passwordPolicy.expiryDays}
                onChange={(e) => handlePasswordPolicyChange('expiryDays', parseInt(e.target.value))}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 flex items-center">
            <UserCheck className="h-4 w-4 mr-2 text-gray-400" />
            Session Settings
          </h4>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={systemSettings.sessionTimeout}
              onChange={(e) => setSystemSettings({
                ...systemSettings,
                sessionTimeout: parseInt(e.target.value),
              })}
              min="5"
              max="1440"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Security Settings
        </button>
      </div>
    </div>
  );
}