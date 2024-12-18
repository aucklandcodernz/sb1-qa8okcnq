import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, startOfWeek } from 'date-fns';
import { Clock, Calendar, Plus } from 'lucide-react';
import { Timesheet, TimeEntry } from '../../types/timesheet';
import TimesheetEntry from './TimesheetEntry';
import { cn } from '../../lib/utils';

const timesheetSchema = z.object({
  employeeId: z.string(),
  periodStart: z.string(),
  periodEnd: z.string(),
  entries: z.array(z.any()).optional(),
  comments: z.string().optional(),
});

interface EmployeeTimesheetFormProps {
  employeeId: string;
  onSubmit: (data: Partial<Timesheet>) => void;
  onCancel: () => void;
  defaultValues?: Partial<Timesheet>;
  projects?: { id: string; name: string }[];
  tasks?: { id: string; name: string }[];
}

export default function EmployeeTimesheetForm({
  employeeId,
  onSubmit,
  onCancel,
  defaultValues,
  projects,
  tasks,
}: EmployeeTimesheetFormProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [entries, setEntries] = useState<TimeEntry[]>(defaultValues?.entries || []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(timesheetSchema),
    defaultValues: {
      employeeId,
      periodStart: format(startOfWeek(new Date()), 'yyyy-MM-dd'),
      periodEnd: format(addDays(startOfWeek(new Date()), 6), 'yyyy-MM-dd'),
      ...defaultValues,
    },
  });

  const handleEntrySubmit = (entry: TimeEntry) => {
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

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      entries,
    });
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(new Date()), i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEEE'),
      entry: entries.find(e => e.date === format(date, 'yyyy-MM-dd')),
    };
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Period Start
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('periodStart')}
              className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          {errors.periodStart && (
            <p className="mt-1 text-sm text-red-600">{errors.periodStart.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Period End
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              {...register('periodEnd')}
              className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          {errors.periodEnd && (
            <p className="mt-1 text-sm text-red-600">{errors.periodEnd.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
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
                      <div className="mt-1 text-xs">
                        {entry.totalHours} hours ({entry.type})
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          {...register('comments')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add any comments about this timesheet..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Timesheet
        </button>
      </div>
    </form>
  );
}