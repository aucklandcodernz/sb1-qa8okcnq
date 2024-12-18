```typescript
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { workSchedulesAtom } from '../../lib/attendance';
import { userAtom } from '../../lib/auth';
import ShiftCalendar from './ShiftCalendar';
import ShiftList from './ShiftList';
import ShiftScheduleForm from './ShiftScheduleForm';
import ShiftSwapRequests from './ShiftSwapRequests';

interface ShiftScheduleSectionProps {
  employeeId: string;
}

export default function ShiftScheduleSection({ employeeId }: ShiftScheduleSectionProps) {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [workSchedules] = useAtom(workSchedulesAtom);

  const employeeSchedules = workSchedules.filter(
    schedule => schedule.employeeId === employeeId
  );

  const canManageSchedules = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');
  const isOwnProfile = user?.id === employeeId;

  const handleSubmitSchedule = (data: any) => {
    // Handle schedule submission
    console.log('Schedule:', data);
    setShowScheduleForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Shifts & Roster</h3>
        {canManageSchedules && (
          <button
            onClick={() => setShowScheduleForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Schedule Shift
          </button>
        )}
      </div>

      {showScheduleForm ? (
        <ShiftScheduleForm
          onSubmit={handleSubmitSchedule}
          onCancel={() => setShowScheduleForm(false)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ShiftCalendar schedules={employeeSchedules} />
            <ShiftList schedules={employeeSchedules} />
          </div>
          <div className="space-y-6">
            {isOwnProfile && <ShiftSwapRequests employeeId={employeeId} />}
          </div>
        </div>
      )}
    </div>
  );
}
```