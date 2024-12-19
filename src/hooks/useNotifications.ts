
import { useState, useEffect } from 'react';
import { userAtom } from '../atoms/user';
import { useAtom } from 'jotai';
import { webSocketService } from '../lib/notifications/websocket';
import type { Notification } from '@prisma/client';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUser] = useAtom(userAtom);

  useEffect(() => {
    if (!currentUser?.id) return;

    webSocketService.connect(currentUser.id);
    webSocketService.subscribe('notification', (notification: Notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    return () => {
      webSocketService.unsubscribe('notification');
      webSocketService.disconnect();
    };
  }, [currentUser?.id]);

  return {
    notifications,
    clearNotifications: () => setNotifications([])
  };
}
