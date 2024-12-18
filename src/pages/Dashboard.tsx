
import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../lib/auth';
import { Users, Clock, Calendar, Target } from 'lucide-react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import QuickStats from '../components/dashboard/QuickStats';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Dashboard() {
  const [user] = useAtom(userAtom);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activities, setActivities] = React.useState([]);
  const [stats, setStats] = React.useState([]);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setActivities([
          {
            id: '1',
            type: 'LEAVE_REQUEST',
            title: 'Leave Request Approved',
            timestamp: new Date().toISOString(),
            user: { name: user?.name || 'Anonymous' }
          }
        ]);

        setStats([
          { title: 'Total Employees', value: '48', icon: <Users className="h-6 w-6" /> },
          { title: 'Attendance Rate', value: '96%', icon: <Clock className="h-6 w-6" /> },
          { title: 'Leave Requests', value: '12', icon: <Calendar className="h-6 w-6" /> },
          { title: 'Goals', value: '8', icon: <Target className="h-6 w-6" /> }
        ]);

        setEvents([
          {
            id: '1',
            title: 'Team Meeting',
            startTime: new Date().toISOString(),
            type: 'MEETING'
          }
        ]);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

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
