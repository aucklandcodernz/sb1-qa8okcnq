
import React from 'react';
import { Download } from 'lucide-react';

export default function PayrollReports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payroll Reports</h2>
          <p className="mt-1 text-sm text-gray-500">Generate and manage payroll reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-600">{report.name}</span>
                <button className="text-indigo-600 hover:text-indigo-700">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
          <h3 className="font-semibold mb-4">Generate Report</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Report Type</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option>Payroll Summary</option>
                <option>Tax Deductions</option>
                <option>Employee Earnings</option>
                <option>Leave Balances</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Generate Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const recentReports = [
  { id: 1, name: 'March 2024 Payroll Summary' },
  { id: 2, name: 'Q1 2024 Tax Filing' },
  { id: 3, name: 'February 2024 Earnings Report' },
];
