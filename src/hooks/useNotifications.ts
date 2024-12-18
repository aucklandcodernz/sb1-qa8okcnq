import { useAtom } from 'jotai';
import { notificationsAtom, markAllAsRead, markNotificationAsRead } from '../lib/notifications';
import { NotificationType } from '../types/notifications';

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