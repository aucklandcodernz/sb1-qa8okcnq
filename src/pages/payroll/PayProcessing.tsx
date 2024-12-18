
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import DataTable from '../../components/ui/DataTable';

export default function PayProcessing() {
  const [status, setStatus] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Pay Processing</h2>
          <p className="text-sm text-gray-500">Process and manage employee payroll runs</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          New Pay Run
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm">
        <Select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
          options={[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'processed', label: 'Processed' },
            { value: 'failed', label: 'Failed' }
          ]}
        />
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          label="Payment Method"
          options={[
            { value: 'all', label: 'All' },
            { value: 'direct_deposit', label: 'Direct Deposit' },
            { value: 'check', label: 'Check' }
          ]}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <DataTable
        columns={[
          { header: 'Pay Run ID', accessor: 'id' },
          { header: 'Pay Period', accessor: 'period' },
          { header: 'Status', accessor: 'status' },
          { header: 'Employees', accessor: 'employees' },
          { header: 'Total Amount', accessor: 'amount' },
          { header: 'Actions', accessor: 'actions' }
        ]}
        data={[]}
        emptyMessage="No payroll records found."
      />
    </div>
  );
}
