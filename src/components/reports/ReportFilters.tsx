import React from 'react';
import { useForm } from 'react-hook-form';
import { Filter, Calendar } from 'lucide-react';

interface ReportFiltersProps {
  onFilter: (filters: any) => void;
}

export default function ReportFilters({ onFilter }: ReportFiltersProps) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Filter className="h-5 w-5 mr-2 text-gray-400" />
          Report Filters
        </h3>

        <form onSubmit={handleSubmit(onFilter)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              {...register('type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="EMPLOYEE_DEMOGRAPHICS">Employee Demographics</option>
              <option value="ATTENDANCE_SUMMARY">Attendance Summary</option>
              <option value="LEAVE_ANALYSIS">Leave Analysis</option>
              <option value="PERFORMANCE_METRICS">Performance Metrics</option>
              <option value="RECRUITMENT_FUNNEL">Recruitment Funnel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Period
            </label>
            <select
              {...register('period')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Periods</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">From</label>
                <input
                  type="date"
                  {...register('dateFrom')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">To</label>
                <input
                  type="date"
                  {...register('dateTo')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Format
            </label>
            <select
              {...register('format')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Formats</option>
              <option value="PDF">PDF</option>
              <option value="EXCEL">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}