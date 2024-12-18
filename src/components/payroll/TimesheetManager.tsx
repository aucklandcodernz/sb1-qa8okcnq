import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus, Filter } from 'lucide-react';
import { timesheetsAtom } from '../../lib/timesheet';
import { userAtom } from '../../lib/auth';
import TimesheetList from '../timesheet/TimesheetList';
import TimesheetForm from '../timesheet/TimesheetForm';
import FilterPanel from '../ui/FilterPanel';

export default function TimesheetManager() {
  const [showForm, setShowForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [timesheets] = useAtom(timesheetsAtom);

  const filterOptions = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'PENDING', label: 'Pending' },
        { value: 'APPROVED', label: 'Approved' },
        { value: 'REJECTED', label: 'Rejected' }
      ]
    },
    {
      id: 'dateRange',
      label: 'Date Range',
      type: 'daterange'
    },
    {
      id: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'HR' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Timesheet Management</h3>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Timesheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel
            title="Filters"
            filters={filterOptions}
            values={{}}
            onChange={() => {}}
          />
        </div>
        <div className="lg:col-span-3">
          {showForm ? (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <TimesheetForm
                onSubmit={() => setShowForm(false)}
                onCancel={() => setShowForm(false)}
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
            <TimesheetList timesheets={timesheets} />
          )}
        </div>
      </div>
    </div>
  );
}