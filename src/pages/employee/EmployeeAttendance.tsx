import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { userAtom } from '../../lib/auth';
import { timesheetsAtom } from '../../lib/timesheet';
import { workSchedulesAtom } from '../../lib/attendance';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import AttendanceStats from '../../components/attendance/AttendanceStats';
import TimeClockCard from '../../components/attendance/TimeClockCard';
import TimesheetSubmissionForm from '../../components/timesheet/TimesheetSubmissionForm';
import TimesheetList from '../../components/timesheet/TimesheetList';
import ShiftCalendar from '../../components/shifts/ShiftCalendar';

interface EmployeeAttendanceProps {
  employeeId: string;
}

export default function EmployeeAttendance({ employeeId }: EmployeeAttendanceProps) {
  const [showTimesheetForm, setShowTimesheetForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [timesheets] = useAtom(timesheetsAtom);
  const [workSchedules] = useAtom(workSchedulesAtom);

  const employeeSchedules = workSchedules.filter(
    schedule => schedule.employeeId === employeeId
  );

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
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Submit Timesheet
        </button>
      </div>

      {showTimesheetForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <TimesheetSubmissionForm
            employeeId={employeeId}
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
              todayEntry={undefined}
              onClockIn={() => {}}
              onClockOut={() => {}}
            />
            <div className="lg:col-span-2">
              <AttendanceStats employeeId={employeeId} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ShiftCalendar schedules={employeeSchedules} />
              <TimesheetList timesheets={timesheets} />
            </div>
            <div>
              <AttendanceCalendar employeeId={employeeId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}