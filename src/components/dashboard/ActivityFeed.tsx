
import React from 'react';
import { format } from 'date-fns';
import { Activity } from '../../types/activity';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <p className="text-gray-500 mt-2">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm">{activity.user.name[0]}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
