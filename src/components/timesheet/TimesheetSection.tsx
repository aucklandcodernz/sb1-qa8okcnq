```typescript
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { timesheetsAtom } from '../../lib/timesheet';
import { userAtom } from '../../lib/auth';
import TimesheetForm from './TimesheetForm';
import TimesheetList from './TimesheetList';
import TimesheetSummary from './TimesheetSummary';
import TimesheetCalendar from './TimesheetCalendar';

interface TimesheetSectionProps {
  employeeId: string;
}

export default function TimesheetSection({ employeeId }: TimesheetSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [timesheets] = useAtom(timesheetsAtom);

  const employeeTimesheets = timesheets.filter(
    timesheet => timesheet.employeeId === employeeId
  );

  const canManageTimesheets = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');
  const isOwnProfile = user?.id === employeeId;

  const handleSubmitTimesheet = (data: any) => {
    // Handle timesheet submission
    console.log('Timesheet:', data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Timesheets</h3>
        {(isOwnProfile || canManageTimesheets) && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Timesheet
          </button>
        )}
      </div>

      {showForm ? (
        <TimesheetForm
          onSubmit={handleSubmitTimesheet}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TimesheetList timesheets={employeeTimesheets} />
            <TimesheetCalendar entries={employeeTimesheets.flatMap(t => t.entries)} />
          </div>
          <div>
            <TimesheetSummary employeeId={employeeId} />
          </div>
        </div>
      )}
    </div>
  );
}
```