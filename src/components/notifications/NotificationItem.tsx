import React from 'react';
import { format } from 'date-fns';
import { 
  Bell, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Info
} from 'lucide-react';
import { Notification, NotificationType } from '../../types/notifications';
import { cn } from '../../lib/utils';

const typeConfig: Record<NotificationType, {
  icon: React.ElementType;
  color: string;
  bgColor: string;
}> = {
  STATUS_CHANGE: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  LEAVE_REQUEST: {
    icon: Calendar,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  APPLICATION_UPDATE: {
    icon: FileText,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  INTERVIEW_SCHEDULED: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  PERFORMANCE_REVIEW: {
    icon: CheckCircle,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  TASK: {
    icon: CheckCircle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  ANNOUNCEMENT: {
    icon: Bell,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  PAYROLL: {
    icon: DollarSign,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  ONBOARDING_UPDATE: {
    icon: Info,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
  TIMESHEET: {
    icon: Clock,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
  },
  MESSAGE: {
    icon: MessageSquare,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  }
};

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

export default function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  const config = typeConfig[notification.type];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <li
      className={cn(
        'py-4 cursor-pointer hover:bg-gray-50',
        !notification.read && 'bg-blue-50'
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className={cn(
            'h-10 w-10 rounded-lg flex items-center justify-center',
            config.bgColor
          )}>
            <Icon className={cn('h-6 w-6', config.color)} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn(
            'text-sm font-medium text-gray-900',
            !notification.read && 'font-semibold'
          )}>
            {notification.title}
          </p>
          <p className="text-sm text-gray-500">{notification.message}</p>
          <p className="mt-1 text-xs text-gray-400">
            {format(new Date(notification.createdAt), 'MMM d, yyyy HH:mm')}
          </p>
        </div>
        {!notification.read && (
          <div className="flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
          </div>
        )}
      </div>
    </li>
  );
}