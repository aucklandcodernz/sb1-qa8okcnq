
import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../lib/auth';
import { Users, Clock, Calendar, Target } from 'lucide-react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import QuickStats from '../components/dashboard/QuickStats';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';

export default function Dashboard() {
  const [user] = useAtom(userAtom);

  const activities = [
    {
      id: '1',
      type: 'LEAVE_REQUEST',
      title: 'Leave Request Approved',
      timestamp: new Date().toISOString(),
      user: { name: user?.name || 'Anonymous' }
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Team Meeting',
      startTime: new Date().toISOString(),
      type: 'MEETING'
    }
  ];

  const stats = [
    { title: 'Total Employees', value: '48', icon: <Users className="h-6 w-6" /> },
    { title: 'Attendance Rate', value: '96%', icon: <Clock className="h-6 w-6" /> },
    { title: 'Leave Requests', value: '12', icon: <Calendar className="h-6 w-6" /> },
    { title: 'Goals', value: '8', icon: <Target className="h-6 w-6" /> }
  ];

  return (
    <div className="space-y-6 p-6">
      <WelcomeBanner userName={user?.name} />
      <QuickStats stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityFeed activities={activities} />
        <UpcomingEvents events={events} />
      </div>
    </div>
  );
}
