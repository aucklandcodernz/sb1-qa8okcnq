import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  FileText, 
  Users,
  Briefcase,
  AlertTriangle,
  Award,
  DollarSign
} from 'lucide-react';
import { cn } from '../../lib/utils';

const quickActions = [
  {
    id: 'clock-in',
    title: 'Clock In/Out',
    description: 'Record your work hours',
    icon: Clock,
    path: '/attendance',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'leave-request',
    title: 'Request Leave',
    description: 'Submit a leave application',
    icon: Calendar,
    path: '/leave',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Access important documents',
    icon: FileText,
    path: '/documents',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'team',
    title: 'Team Directory',
    description: 'View team members',
    icon: Users,
    path: '/team',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'jobs',
    title: 'Job Openings',
    description: 'View current vacancies',
    icon: Briefcase,
    path: '/recruitment',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 'safety',
    title: 'Report Hazard',
    description: 'Report safety concerns',
    icon: AlertTriangle,
    path: '/safety',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    id: 'training',
    title: 'Training',
    description: 'Access learning resources',
    icon: Award,
    path: '/training',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  {
    id: 'payslips',
    title: 'Payslips',
    description: 'View pay history',
    icon: DollarSign,
    path: '/payroll',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
];

export default function QuickAccess() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={() => navigate(action.path)}
            className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={cn(
              'flex-shrink-0 p-3 rounded-lg mr-4',
              action.bgColor
            )}>
              <Icon className={cn('h-6 w-6', action.color)} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-medium text-gray-900">
                {action.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {action.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}