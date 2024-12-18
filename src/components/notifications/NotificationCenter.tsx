import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Bell } from 'lucide-react';
import { notificationsAtom, markAllAsRead } from '../../lib/notifications';
import NotificationList from './NotificationList';
import { cn } from '../../lib/utils';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useAtom(notificationsAtom);

  // Ensure notifications is an array
  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  const handleMarkAllRead = () => {
    markAllAsRead();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setIsOpen(false)}
          />
          <div className={cn(
            'absolute right-0 mt-2 w-96 max-h-[80vh] overflow-y-auto',
            'bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'
          )}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <NotificationList onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}