import React from 'react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { 
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Bell
} from 'lucide-react';

export interface Activity {
  id: string;
  type: string;
  title: string;
  description?: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'LEAVE_REQUEST':
      return Calendar;
    case 'DOCUMENT':
      return FileText;
    case 'MESSAGE':
      return MessageSquare;
    case 'TIMESHEET':
      return Clock;
    case 'APPROVAL':
      return CheckCircle;
    case 'REJECTION':
      return XCircle;
    case 'ALERT':
      return AlertCircle;
    default:
      return Bell;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'LEAVE_REQUEST':
      return 'text-green-500 bg-green-100';
    case 'DOCUMENT':
      return 'text-blue-500 bg-blue-100';
    case 'MESSAGE':
      return 'text-purple-500 bg-purple-100';
    case 'TIMESHEET':
      return 'text-yellow-500 bg-yellow-100';
    case 'APPROVAL':
      return 'text-emerald-500 bg-emerald-100';
    case 'REJECTION':
      return 'text-red-500 bg-red-100';
    case 'ALERT':
      return 'text-orange-500 bg-orange-100';
    default:
      return 'text-gray-500 bg-gray-100';
  }
};

export default function ActivityFeed({
  activities,
  className,
}: ActivityFeedProps) {
  return (
    <div className={cn('flow-root', className)}>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h3>
      <ul role="list" className="-mb-8">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const iconColors = getActivityColor(activity.type);

          return (
            <li key={activity.id}>
              <div className="relative pb-8">
                {index !== activities.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-center space-x-3">
                  <div>
                    <span className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                      iconColors
                    )}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.title}
                      </span>
                      {activity.user && (
                        <span className="ml-1">
                          by <span className="font-medium text-gray-900">{activity.user.name}</span>
                        </span>
                      )}
                    </div>
                    {activity.description && (
                      <p className="mt-0.5 text-sm text-gray-500">
                        {activity.description}
                      </p>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      {format(new Date(activity.timestamp), 'MMM d, yyyy HH:mm')}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        {activities.length === 0 && (
          <li className="text-center text-sm text-gray-500 py-4">
            No recent activity
          </li>
        )}
      </ul>
    </div>
  );
}