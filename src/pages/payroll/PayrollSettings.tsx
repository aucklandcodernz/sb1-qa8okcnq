import React from 'react';
import { useAtom } from 'jotai';
import { payrollSettingsAtom } from '../../lib/payroll';
import { userAtom } from '../../lib/auth';

export default function PayrollSettings() {
  const [settings, setSettings] = useAtom(payrollSettingsAtom);
  const [user] = useAtom(userAtom);

  const handleSettingChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Payroll Settings</h3>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pay Frequency
              </label>
              <select
                value={settings.payFrequency}
                onChange={(e) => handleSettingChange('payFrequency', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="WEEKLY">Weekly</option>
                <option value="FORTNIGHTLY">Fortnightly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pay Day
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={settings.payDay}
                onChange={(e) => handleSettingChange('payDay', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Payment Method
              </label>
              <select
                value={settings.defaultPaymentMethod}
                onChange={(e) => handleSettingChange('defaultPaymentMethod', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CHECK">Check</option>
                <option value="CASH">Cash</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default KiwiSaver Rate
              </label>
              <select
                value={settings.defaultKiwiSaverRate}
                onChange={(e) => handleSettingChange('defaultKiwiSaverRate', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="0.03">3%</option>
                <option value="0.04">4%</option>
                <option value="0.06">6%</option>
                <option value="0.08">8%</option>
                <option value="0.10">10%</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}