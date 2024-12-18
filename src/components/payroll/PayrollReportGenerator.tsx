import React, { useState } from 'react';
import { FileSpreadsheet, Download, FileCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ReportType {
  id: string;
  name: string;
  description?: string;
}

const reportTypes: ReportType[] = [
  { id: 'absence', name: 'Absence' },
  { id: 'annual-leave', name: 'Annual leave summary' },
  { id: 'timesheet', name: 'Company timesheet' },
  { id: 'employee-info', name: 'Employee information' },
  { id: 'exceptions', name: 'Payroll exceptions' },
  { id: 'rota', name: 'Rota' },
];

export default function PayrollReportGenerator() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const toggleReport = (reportId: string) => {
    setSelectedReports(current =>
      current.includes(reportId)
        ? current.filter(id => id !== reportId)
        : [...current, reportId]
    );
  };

  const handleGenerateReports = () => {
    // In a real app, this would trigger report generation
    console.log('Generating reports:', selectedReports);
  };

  const handleDownloadCSV = () => {
    // In a real app, this would trigger CSV download
    console.log('Downloading CSV for reports:', selectedReports);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2 text-gray-400" />
            Payroll Report Generator
          </h3>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">
            Select reports to support your payroll
          </h4>

          <div className="space-y-2">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className={cn(
                  'p-4 rounded-lg cursor-pointer transition-colors',
                  selectedReports.includes(report.id)
                    ? 'bg-blue-50'
                    : 'bg-gray-50 hover:bg-gray-100'
                )}
                onClick={() => toggleReport(report.id)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => toggleReport(report.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <label className="block text-sm font-medium text-gray-700">
                      {report.name}
                    </label>
                    {report.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {report.description}
                      </p>
                    )}
                  </div>
                  {selectedReports.includes(report.id) && (
                    <FileCheck className="ml-auto h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleGenerateReports}
              disabled={selectedReports.length === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Generate payroll reports
            </button>

            <button
              onClick={handleDownloadCSV}
              disabled={selectedReports.length === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}