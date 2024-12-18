import React from 'react';
import { useAtom } from 'jotai';
import { Bell } from 'lucide-react';
import { notificationsAtom, markNotificationAsRead } from '../../lib/notifications';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  onClose?: () => void;
}

export default function NotificationList({ onClose }: NotificationListProps) {
  const [notifications] = useAtom(notificationsAtom);

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    if (onClose) {
      onClose();
    }
  };

  // Ensure notifications is an array
  const notificationList = notifications || [];

  if (notificationList.length === 0) {
    return (
      <div className="text-center py-6">
        <Bell className="mx-auto h-12 w-12 text-gray-300" />
        <p className="mt-2 text-sm font-medium text-gray-900">No notifications</p>
        <p className="mt-1 text-sm text-gray-500">
          You're all caught up! Check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {notificationList.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={() => handleNotificationClick(notification.id)}
          />
        ))}
      </ul>
    </div>
  );
}