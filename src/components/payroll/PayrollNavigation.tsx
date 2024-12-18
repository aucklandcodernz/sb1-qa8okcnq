import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Calendar,
  FileText,
  DollarSign,
  Users,
  Settings,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

export default function PayrollNavigation({ organizationId }: { organizationId: string }) {
  const location = useLocation();
  
  const navigation: NavItem[] = [
    {
      name: 'Pay Processing',
      href: `/organizations/${organizationId}/payroll/processing`,
      icon: DollarSign,
      description: 'Process payroll runs and manage payments'
    },
    {
      name: 'Timesheets',
      href: `/organizations/${organizationId}/payroll/timesheets`,
      icon: Clock,
      description: 'Review and approve employee timesheets'
    },
    {
      name: 'Pay Calendar',
      href: `/organizations/${organizationId}/payroll/calendar`,
      icon: Calendar,
      description: 'View pay periods and important dates'
    },
    {
      name: 'Compliance',
      href: `/organizations/${organizationId}/payroll/compliance`,
      icon: AlertTriangle,
      description: 'Monitor and maintain payroll compliance'
    },
    {
      name: 'Reports',
      href: `/organizations/${organizationId}/payroll/reports`,
      icon: FileText,
      description: 'Generate payroll and tax reports'
    },
    {
      name: 'Calculators',
      href: `/organizations/${organizationId}/payroll/calculators`,
      icon: Calculator,
      description: 'PAYE, KiwiSaver, and leave calculators'
    }
  ];

  return (
    <nav className="space-y-1 px-2 py-4">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <Icon
              className={cn(
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                isActive
                  ? 'text-indigo-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            <div>
              <span className="font-medium">{item.name}</span>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}