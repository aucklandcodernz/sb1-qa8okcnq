import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { BarChart2, Download, Filter } from 'lucide-react';
import { userAtom } from '../lib/auth';
import ReportsList from '../components/reports/ReportsList';
import ReportFilters from '../components/reports/ReportFilters';
import ReportViewer from '../components/reports/ReportViewer';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [user] = useAtom(userAtom);

  const handleGenerateReport = (reportId: string) => {
    setSelectedReport(reportId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
          <p className="mt-1 text-sm text-gray-500">
            Generate and view HR analytics and reports
          </p>
        </div>
        {selectedReport && (
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="-ml-1 mr-2 h-5 w-5" />
            Export Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ReportFilters onFilter={() => {}} />
        </div>
        <div className="lg:col-span-3">
          {selectedReport ? (
            <ReportViewer 
              reportId={selectedReport} 
              onClose={() => setSelectedReport(null)}
            />
          ) : (
            <ReportsList onGenerateReport={handleGenerateReport} />
          )}
        </div>
      </div>
    </div>
  );
}