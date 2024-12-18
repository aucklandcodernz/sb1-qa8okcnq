import React from 'react';
import { useForm } from 'react-hook-form';
import { Filter } from 'lucide-react';

interface PayrollFiltersProps {
  onFilter: (filters: any) => void;
}

export default function PayrollFilters({ onFilter }: PayrollFiltersProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onFilter)} className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Filter className="h-4 w-4 mr-2 text-gray-400" />
          Filters
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="DRAFT">Draft</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            {...register('paymentMethod')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="CHECK">Check</option>
            <option value="CASH">Cash</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From Date
          </label>
          <input
            type="date"
            {...register('fromDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To Date
          </label>
          <input
            type="date"
            {...register('toDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}