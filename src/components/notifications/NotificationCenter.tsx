
import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationList from './NotificationList';
import { Button } from '../ui/Button';

export default function NotificationCenter() {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications ({unreadCount})</h2>
        <Button onClick={clearNotifications} variant="secondary">
          Clear All
        </Button>
      </div>
      <NotificationList 
        notifications={notifications}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
}
