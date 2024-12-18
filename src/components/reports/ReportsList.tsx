import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { 
  BarChart2, 
  Users, 
  Clock,
  Calendar,
  Target,
  Briefcase,
  BookOpen,
  DollarSign,
  UserMinus
} from 'lucide-react';
import { reportsAtom } from '../../lib/reports';
import { Report } from '../../types/reports';
import { cn } from '../../lib/utils';

interface ReportsListProps {
  onGenerateReport: (reportId: string) => void;
}

const reportConfig = {
  EMPLOYEE_DEMOGRAPHICS: {
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  ATTENDANCE_SUMMARY: {
    icon: Clock,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  LEAVE_ANALYSIS: {
    icon: Calendar,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  PERFORMANCE_METRICS: {
    icon: Target,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  RECRUITMENT_FUNNEL: {
    icon: Briefcase,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  TRAINING_COMPLETION: {
    icon: BookOpen,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  PAYROLL_SUMMARY: {
    icon: DollarSign,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  TURNOVER_ANALYSIS: {
    icon: UserMinus,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
};

export default function ReportsList({ onGenerateReport }: ReportsListProps) {
  const [reports] = useAtom(reportsAtom);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <BarChart2 className="h-5 w-5 mr-2 text-gray-400" />
          Available Reports
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {reports.map((report) => {
              const config = reportConfig[report.type];
              const Icon = config.icon;
              
              return (
                <li key={report.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        config.bgColor
                      )}>
                        <Icon className={cn('h-6 w-6', config.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {report.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {report.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>Period: {report.period.toLowerCase()}</span>
                        <span>Format: {report.format.join(', ')}</span>
                        {report.lastGenerated && (
                          <span>
                            Last Generated: {format(new Date(report.lastGenerated), 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => onGenerateReport(report.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Generate Report
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}