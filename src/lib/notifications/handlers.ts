
import { prisma } from '../db';
import { notifyUser } from '../../server/websocket';
import type { Notification } from '@prisma/client';

export async function createNotification(userId: string, data: {
  type: string;
  title: string;
  message: string;
}) {
  const notification = await prisma.notification.create({
    data: {
      ...data,
      userId,
      read: false
    }
  });

  await notifyUser(userId, notification);
  return notification;
}

export async function markAsRead(notificationId: string) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { read: true }
  });
}

export async function getUserNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function deleteNotification(notificationId: string) {
  return prisma.notification.delete({
    where: { id: notificationId }
  });
}
