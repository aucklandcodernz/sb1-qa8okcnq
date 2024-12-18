import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { Clock, Calendar, MapPin, BarChart2 } from 'lucide-react';
import { timeEntriesAtom, clockIn, clockOut } from '../lib/attendance';
import { userAtom } from '../lib/auth';
import AttendanceCalendar from '../components/attendance/AttendanceCalendar';
import TimeClockCard from '../components/attendance/TimeClockCard';
import AttendanceStats from '../components/attendance/AttendanceStats';
import ShiftSchedule from '../components/attendance/ShiftSchedule';
import EmployeeTimesheetForm from '../components/timesheet/EmployeeTimesheetForm';

export default function TimeAndAttendance() {
  const [user] = useAtom(userAtom);
  const [timeEntries] = useAtom(timeEntriesAtom);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address: string }>();
  const [employeeAge] = useState<number | undefined>(25);
  const [showTimesheetForm, setShowTimesheetForm] = useState(false);

  const todayEntry = timeEntries.find(
    entry => entry.employeeId === user?.id && entry.date === format(new Date(), 'yyyy-MM-dd')
  );

  const weeklyTimeEntries = timeEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return entry.employeeId === user?.id && entryDate >= weekStart;
  });

  const breaks = [
    { startTime: '10:30', endTime: '10:40', type: 'REST_BREAK' as const },
    { startTime: '12:30', endTime: '13:00', type: 'MEAL_BREAK' as const },
    { startTime: '15:30', endTime: '15:40', type: 'REST_BREAK' as const },
  ];

  const handleClockIn = () => {
    if (user) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Current Location',
          };
          setLocation(loc);
          clockIn(user.id, loc);
        });
      } else {
        clockIn(user.id);
      }
    }
  };

  const handleClockOut = () => {
    if (user) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Current Location',
          };
          setLocation(loc);
          clockOut(user.id, loc);
        });
      } else {
        clockOut(user.id);
      }
    }
  };

  const handleTimesheetSubmit = (data: any) => {
    // Handle timesheet submission
    console.log('Timesheet submitted:', data);
    setShowTimesheetForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Time & Attendance</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your working hours and attendance
          </p>
        </div>
        <button
          onClick={() => setShowTimesheetForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Clock className="-ml-1 mr-2 h-5 w-5" />
          Submit Timesheet
        </button>
      </div>

      {showTimesheetForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <EmployeeTimesheetForm
            employeeId={user?.id || ''}
            onSubmit={handleTimesheetSubmit}
            onCancel={() => setShowTimesheetForm(false)}
            projects={[
              { id: 'p1', name: 'Project A' },
              { id: 'p2', name: 'Project B' },
            ]}
            tasks={[
              { id: 't1', name: 'Development' },
              { id: 't2', name: 'Testing' },
            ]}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TimeClockCard
              todayEntry={todayEntry}
              onClockIn={handleClockIn}
              onClockOut={handleClockOut}
              location={location}
              employeeAge={employeeAge}
              weeklyTimeEntries={weeklyTimeEntries}
              breaks={breaks}
            />
            <div className="lg:col-span-2">
              <AttendanceStats employeeId={user?.id} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ShiftSchedule employeeId={user?.id} />
            <AttendanceCalendar employeeId={user?.id} />
          </div>
        </>
      )}
    </div>
  );
}