import React from 'react';
import { useAtom } from 'jotai';
import { Bell } from 'lucide-react';
import { notificationsAtom } from '../../lib/notifications';
import NotificationItem from '../notifications/NotificationItem';

export default function NotificationList() {
  const [notifications] = useAtom(notificationsAtom);

  // Ensure notifications is an array
  const notificationList = notifications || [];

  if (notificationList.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center">
          <Bell className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-sm font-medium text-gray-900">No notifications</p>
          <p className="mt-1 text-sm text-gray-500">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Notifications</h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {notificationList.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => {
                  if (notification.action?.url) {
                    window.location.href = notification.action.url;
                  }
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}