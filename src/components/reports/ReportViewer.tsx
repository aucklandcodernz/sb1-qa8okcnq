import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { 
  BarChart2, 
  Download,
  Calendar,
  RefreshCw,
  X
} from 'lucide-react';
import { reportsAtom, reportDataAtom, generateReport } from '../../lib/reports';
import { cn } from '../../lib/utils';

interface ReportViewerProps {
  reportId: string;
  onClose: () => void;
}

export default function ReportViewer({ reportId, onClose }: ReportViewerProps) {
  const [reports] = useAtom(reportsAtom);
  const [reportData] = useAtom(reportDataAtom);

  const report = reports.find(r => r.id === reportId);
  if (!report) return null;

  const handleRefresh = async () => {
    await generateReport(reportId, {});
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BarChart2 className="h-6 w-6 text-gray-400 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-500">{report.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-400 hover:text-gray-500"
              title="Refresh Report"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Period: {report.period.toLowerCase()}
              </div>
              <div>
                Available formats: {report.format.join(', ')}
              </div>
            </div>
            <div className="flex space-x-2">
              {report.format.map((format) => (
                <button
                  key={format}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="h-4 w-4 mr-1" />
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Report content would go here */}
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            Report visualization and data would be displayed here
          </div>
        </div>
      </div>
    </div>
  );
}