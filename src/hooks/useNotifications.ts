import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';
import { webSocketService } from '../lib/notifications/websocket';
import { getUserNotifications, markAsRead as markNotificationAsRead, deleteNotification } from '../lib/notifications/handlers';

export const useNotifications = () => {
  const [notifications] = useAtom(notificationsAtom);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationsByType = (type: NotificationType) => 
    notifications.filter(n => n.type === type);

  const getUnreadByType = (type: NotificationType) =>
    notifications.filter(n => n.type === type && !n.read).length;

  const markAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const markAllRead = () => {
    markAllAsRead();
  };

  return {
    notifications,
    unreadCount,
    getNotificationsByType,
    getUnreadByType,
    markAsRead,
    markAllRead,
  };
};
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';
import { webSocketService } from '../lib/notifications/websocket';

export type Notification = {
  id: string;
  type: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
  read: boolean;
  createdAt: Date;
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUser] = useAtom(userAtom);

  useEffect(() => {
    if (!currentUser?.id) return;

    webSocketService.connect(currentUser.id);

    webSocketService.subscribe('notification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, [currentUser?.id]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    markAsRead,
    clearNotifications,
  };
}
