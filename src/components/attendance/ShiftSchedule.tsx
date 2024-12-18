import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeftRight } from 'lucide-react';
import { workSchedulesAtom } from '../../lib/attendance';
import { cn } from '../../lib/utils';
import RequestShiftSwapModal from './RequestShiftSwapModal';

interface ShiftScheduleProps {
  employeeId?: string;
}

const getShiftTypeColor = (shiftType: string) => {
  switch (shiftType) {
    case 'REGULAR':
      return 'bg-blue-100 text-blue-800';
    case 'NIGHT':
      return 'bg-purple-100 text-purple-800';
    case 'FLEXIBLE':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ShiftSchedule({ employeeId }: ShiftScheduleProps) {
  const [workSchedules] = useAtom(workSchedulesAtom);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<{
    date: string;
    startTime: string;
    endTime: string;
  } | null>(null);

  if (!employeeId) return null;

  const employeeSchedules = workSchedules.filter(
    schedule => schedule.employeeId === employeeId
  );

  const weekDays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const handleShiftSwapRequest = (dayOfWeek: number, schedule: any) => {
    setSelectedShift({
      date: format(new Date(), 'yyyy-MM-dd'), // This should be the actual shift date
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    });
    setShowSwapModal(true);
  };

  const handleSwapSubmit = (data: any) => {
    // Here you would implement the actual shift swap request logic
    console.log('Shift swap requested:', data);
    setShowSwapModal(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Weekly Schedule
        </h3>

        <div className="space-y-4">
          {weekDays.map((day, index) => {
            const schedule = employeeSchedules.find(s => s.dayOfWeek === index);
            
            return (
              <div
                key={day}
                className={cn(
                  'p-4 rounded-lg border',
                  schedule?.isWorkingDay
                    ? 'border-gray-200'
                    : 'border-gray-100 bg-gray-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">
                      {day}
                    </span>
                    {schedule?.isWorkingDay && schedule.shiftType && (
                      <span className={cn(
                        'text-xs px-2 py-1 rounded-full',
                        getShiftTypeColor(schedule.shiftType)
                      )}>
                        {schedule.shiftType}
                      </span>
                    )}
                  </div>
                  
                  {schedule?.isWorkingDay && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <button
                        onClick={() => handleShiftSwapRequest(index, schedule)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                        title="Request shift swap"
                      >
                        <ArrowLeftRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {schedule?.flexibleHours && (
                  <div className="mt-2 text-sm text-gray-500">
                    Core hours: {schedule.flexibleHours.coreStartTime} - {schedule.flexibleHours.coreEndTime}
                    <br />
                    Minimum hours: {schedule.flexibleHours.minHours}
                  </div>
                )}

                {schedule?.breakDuration && (
                  <div className="mt-2 text-sm text-gray-500">
                    Break duration: {schedule.breakDuration} minutes
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showSwapModal && selectedShift && (
        <RequestShiftSwapModal
          onClose={() => setShowSwapModal(false)}
          onSubmit={handleSwapSubmit}
          currentShift={selectedShift}
        />
      )}
    </div>
  );
}