import React from 'react';
import { useAtom } from 'jotai';
import { systemSettingsAtom } from '../../lib/settings';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function NotificationSettings() {
  const [systemSettings, setSystemSettings] = useAtom(systemSettingsAtom);

  const toggleChannel = (channel: 'EMAIL' | 'IN_APP' | 'SMS') => {
    const currentChannels = systemSettings.notificationChannels;
    const newChannels = currentChannels.includes(channel)
      ? currentChannels.filter(c => c !== channel)
      : [...currentChannels, channel];

    setSystemSettings({
      ...systemSettings,
      notificationChannels: newChannels,
    });
  };

  const notificationTypes = [
    {
      id: 'EMAIL',
      name: 'Email Notifications',
      description: 'Receive important updates and alerts via email',
      icon: Mail,
    },
    {
      id: 'IN_APP',
      name: 'In-App Notifications',
      description: 'Get real-time notifications within the application',
      icon: Bell,
    },
    {
      id: 'SMS',
      name: 'SMS Notifications',
      description: 'Receive urgent notifications via text message',
      icon: Smartphone,
    },
  ];

  const notificationCategories = [
    {
      title: 'Leave Management',
      items: [
        'Leave request approvals',
        'Leave request status updates',
        'Leave balance updates',
      ],
    },
    {
      title: 'Performance Reviews',
      items: [
        'New review assignments',
        'Review completion reminders',
        'Feedback requests',
      ],
    },
    {
      title: 'Time & Attendance',
      items: [
        'Late check-in alerts',
        'Overtime notifications',
        'Schedule changes',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-gray-400" />
          Notification Channels
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to receive notifications
        </p>
        <div className="mt-4 space-y-4">
          {notificationTypes.map((type) => {
            const Icon = type.icon;
            const isEnabled = systemSettings.notificationChannels.includes(type.id as any);

            return (
              <div
                key={type.id}
                className="relative flex items-start py-4 border-b border-gray-200"
              >
                <div className="min-w-0 flex-1 text-sm">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label
                        htmlFor={`notification-${type.id}`}
                        className="font-medium text-gray-700"
                      >
                        {type.name}
                      </label>
                      <p className="text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex items-center h-5">
                  <input
                    id={`notification-${type.id}`}
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => toggleChannel(type.id as any)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-gray-400" />
          Notification Categories
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Customize which types of notifications you receive
        </p>
        <div className="mt-4 space-y-6">
          {notificationCategories.map((category) => (
            <div key={category.title}>
              <h4 className="text-sm font-medium text-gray-900">{category.title}</h4>
              <div className="mt-2 space-y-2">
                {category.items.map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-700">{item}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className={cn(
            "inline-flex justify-center py-2 px-4 border border-transparent",
            "shadow-sm text-sm font-medium rounded-md text-white",
            "bg-indigo-600 hover:bg-indigo-700",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          )}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}