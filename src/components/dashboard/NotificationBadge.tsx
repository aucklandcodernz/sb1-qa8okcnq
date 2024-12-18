import React from 'react';
import { useAtom } from 'jotai';
import { Bell } from 'lucide-react';
import { notificationsAtom } from '../../lib/notifications';
import { cn } from '../../lib/utils';

export default function NotificationBadge() {
  const [notifications] = useAtom(notificationsAtom);
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <div className="relative">
      <Bell className="h-6 w-6 text-gray-400 hover:text-gray-500" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-xs font-medium text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </span>
      )}
    </div>
  );
}