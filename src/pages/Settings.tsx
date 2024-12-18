import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Settings as SettingsIcon, Building2, Lock, Bell, Clock, Globe } from 'lucide-react';
import { userAtom } from '../lib/auth';
import SystemSettingsForm from '../components/settings/SystemSettingsForm';
import OrganizationSettingsForm from '../components/settings/OrganizationSettingsForm';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';

type SettingsTab = 'system' | 'organization' | 'notifications' | 'security';

export default function Settings() {
  const [currentUser] = useAtom(userAtom);
  const [activeTab, setActiveTab] = useState<SettingsTab>('system');

  const tabs = [
    { id: 'system', label: 'System', icon: SettingsIcon, showFor: ['SUPER_ADMIN'] },
    { id: 'organization', label: 'Organization', icon: Building2, showFor: ['SUPER_ADMIN', 'ORG_ADMIN'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, showFor: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'] },
    { id: 'security', label: 'Security', icon: Lock, showFor: ['SUPER_ADMIN', 'ORG_ADMIN'] },
  ];

  const visibleTabs = tabs.filter(tab => tab.showFor.includes(currentUser?.role || ''));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your system and organization settings
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`
                    group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className={`
                    -ml-1 mr-2 h-5 w-5
                    ${activeTab === tab.id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'system' && currentUser?.role === 'SUPER_ADMIN' && (
            <SystemSettingsForm />
          )}
          {activeTab === 'organization' && (
            <OrganizationSettingsForm organizationId={currentUser?.organizationId} />
          )}
          {activeTab === 'notifications' && (
            <NotificationSettings />
          )}
          {activeTab === 'security' && (
            <SecuritySettings />
          )}
        </div>
      </div>
    </div>
  );
}