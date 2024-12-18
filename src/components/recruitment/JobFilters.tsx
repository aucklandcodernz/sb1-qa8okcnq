import React from 'react';
import { useForm } from 'react-hook-form';
import { Filter, Search, Calendar } from 'lucide-react';

interface JobFiltersProps {
  onFilter: (filters: any) => void;
}

export default function JobFilters({ onFilter }: JobFiltersProps) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Filter className="h-5 w-5 mr-2 text-gray-400" />
          Job Filters
        </h3>

        <form onSubmit={handleSubmit(onFilter)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                {...register('search')}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search jobs..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              {...register('department')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="hr">Human Resources</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employment Type
            </label>
            <select
              {...register('employmentType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Intern</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register('status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="CLOSED">Closed</option>
              <option value="ON_HOLD">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Posted Date Range
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