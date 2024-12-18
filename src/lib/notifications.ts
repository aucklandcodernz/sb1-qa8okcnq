import { atom } from 'jotai';
import { Notification } from '../types/notifications';

export const notificationsAtom = atom<Notification[]>([
  {
    id: '1',
    type: 'LEAVE_REQUEST',
    title: 'Leave Request Approved',
    message: 'Your leave request has been approved',
    priority: 'MEDIUM',
    recipientId: 'user1',
    read: false,
    createdAt: new Date().toISOString(),
    channels: ['EMAIL', 'IN_APP'],
  },
  {
    id: '2',
    type: 'TIMESHEET',
    title: 'Timesheet Due',
    message: 'Please submit your timesheet for this week',
    priority: 'HIGH',
    recipientId: 'user1',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    channels: ['IN_APP'],
  },
]);

export const markNotificationAsRead = (notificationId: string): void => {
  notificationsAtom.init = notificationsAtom.init.map(notification =>
    notification.id === notificationId
      ? { ...notification, read: true }
      : notification
  );
};

export const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>): void => {
  const newNotification: Notification = {
    ...notification,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };

  notificationsAtom.init = [newNotification, ...notificationsAtom.init];
};

export const clearNotifications = (): void => {
  notificationsAtom.init = [];
};

export const getUnreadCount = (): number => {
  return notificationsAtom.init.filter(n => !n.read).length;
};

export const markAllAsRead = (): void => {
  notificationsAtom.init = notificationsAtom.init.map(notification => ({
    ...notification,
    read: true
  }));
};