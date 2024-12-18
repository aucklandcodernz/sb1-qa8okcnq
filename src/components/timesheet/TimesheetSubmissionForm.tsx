import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Clock, Plus } from 'lucide-react';
import { TimeEntry } from '../../types/timesheet';
import TimesheetEntry from './TimesheetEntry';

interface TimesheetSubmissionFormProps {
  employeeId: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  projects?: { id: string; name: string }[];
  tasks?: { id: string; name: string }[];
}

export default function TimesheetSubmissionForm({
  employeeId,
  onSubmit,
  onCancel,
  projects,
  tasks,
}: TimesheetSubmissionFormProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [entries, setEntries] = useState<Partial<TimeEntry>[]>([]);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(new Date()), i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEEE'),
      entry: entries.find(e => e.date === format(date, 'yyyy-MM-dd')),
    };
  });

  const handleEntrySubmit = (entry: Partial<TimeEntry>) => {
    setEntries(current => {
      const index = current.findIndex(e => e.date === entry.date);
      if (index >= 0) {
        return [
          ...current.slice(0, index),
          entry,
          ...current.slice(index + 1),
        ];
      }
      return [...current, entry];
    });
    setSelectedDate(null);
  };

  const handleFormSubmit = () => {
    onSubmit({
      employeeId,
      entries,
    });
  };

  return (
    <div className="space-y-6">
      {selectedDate ? (
        <div className="bg-white shadow-sm rounded-lg p-4">
          <div className="mb-4 flex justify-between items-center">
            <h4 className="text-lg font-medium text-gray-900">
              Time Entry for {format(new Date(selectedDate), 'EEEE, MMMM d')}
            </h4>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <TimesheetEntry
            date={selectedDate}
            onSubmit={handleEntrySubmit}
            defaultValues={entries.find(e => e.date === selectedDate)}
            projects={projects}
            tasks={tasks}
          />
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
          {weekDays.map(({ date, dayName, entry }) => (
            <div
              key={date}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedDate(date)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{dayName}</h4>
                  <p className="text-sm text-gray-500">{format(new Date(date), 'MMMM d')}</p>
                </div>
                {entry ? (
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {entry.startTime} - {entry.endTime}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Time
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleFormSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Timesheet
        </button>
      </div>
    </div>
  );
}