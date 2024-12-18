import React from 'react';
import { Activity } from '../../types/activity';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 border-b border-gray-100 pb-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-xs text-gray-500">{activity.user.name}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <p className="text-sm text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  );
}