import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  id: string;
  name: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  downloadUrl?: string;
}

export default function PayrollReportList() {
  // Mock data - in a real app this would come from your state management
  const reports: Report[] = [
    {
      id: '1',
      name: 'March 2024 Payroll Summary',
      date: '2024-03-01',
      status: 'COMPLETED',
      downloadUrl: '#',
    },
    {
      id: '2',
      name: 'Q1 2024 Tax Filing',
      date: '2024-03-31',
      status: 'PENDING',
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(report.date), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              {report.status === 'COMPLETED' && report.downloadUrl && (
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}