import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../lib/auth';
import { Users, Clock, Calendar, Target } from 'lucide-react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import QuickAccess from '../components/dashboard/QuickAccess';
import MetricsCard from '../components/dashboard/MetricsCard';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import NotificationList from '../components/dashboard/NotificationList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import LeaveBalanceCard from '../components/leave/LeaveBalanceCard';
import TimeClockCard from '../components/attendance/TimeClockCard';
import CalendarWidget from '../components/dashboard/CalendarWidget';

export default function Dashboard() {
  const [user] = useAtom(userAtom);

  // Mock data for metrics
  const metrics = [
    {
      title: 'Total Employees',
      value: '248',
      change: { value: 3.2, trend: 'up' as const },
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Attendance Rate',
      value: '97.5%',
      change: { value: 0.7, trend: 'up' as const },
      icon: <Clock className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'Leave Requests',
      value: '15',
      change: { value: 25, trend: 'up' as const },
      icon: <Calendar className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: 'Performance',
      value: '4.2',
      change: { value: 2.4, trend: 'up' as const },
      icon: <Target className="h-6 w-6 text-purple-500" />,
    },
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Team Meeting',
      type: 'MEETING' as const,
      startTime: '2024-03-15T10:00:00Z',
      endTime: '2024-03-15T11:00:00Z',
      location: 'Conference Room A',
      category: 'Team Sync',
    },
    {
      id: '2',
      title: 'Safety Training',
      type: 'TRAINING' as const,
      startTime: '2024-03-15T14:00:00Z',
      endTime: '2024-03-15T16:00:00Z',
      location: 'Virtual Meeting',
      isVirtual: true,
      category: 'Compliance',
    },
  ];

  // Mock data for activity feed
  const activities = [
    {
      id: '1',
      type: 'LEAVE_REQUEST',
      title: 'Leave Request Approved',
      timestamp: '2024-03-14T09:30:00Z',
      user: {
        name: 'John Smith',
      },
    },
    {
      id: '2',
      type: 'TIMESHEET',
      title: 'Timesheet Submitted',
      timestamp: '2024-03-14T10:15:00Z',
      user: {
        name: 'Sarah Johnson',
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <WelcomeBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickAccess />
        </div>
        <div>
          <TimeClockCard
            todayEntry={undefined}
            onClockIn={() => {}}
            onClockOut={() => {}}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricsCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LeaveBalanceCard employeeId={user?.id} />
            <UpcomingEvents events={upcomingEvents} />
          </div>
          <ActivityFeed activities={activities} className="bg-white rounded-lg shadow-sm p-6" />
        </div>
        <div className="space-y-6">
          <NotificationList />
          <CalendarWidget events={upcomingEvents.map(event => ({
            id: event.id,
            date: event.startTime.split('T')[0],
            title: event.title,
            type: event.type,
          }))} />
        </div>
      </div>
    </div>
  );
}
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
