
import React from 'react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import QuickStats from '../components/dashboard/QuickStats';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <WelcomeBanner />
      <QuickStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityFeed />
        <UpcomingEvents />
      </div>
    </div>
  );
}
