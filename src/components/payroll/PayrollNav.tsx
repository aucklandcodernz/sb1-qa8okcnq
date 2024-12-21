import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { 
  DollarSign, 
  Calculator, 
  FileText, 
  Clock,
  Calendar,
  Settings,
  Users
} from 'lucide-react';
import { userAtom } from '../../atoms/user';
import { cn } from '../../lib/utils';

interface PayrollNavProps {
  organizationId: string;
}

function PayrollNav({ organizationId }: PayrollNavProps) {
  const location = useLocation();
  const [user] = useAtom(userAtom);
  
  const tabs = [
    { 
      id: 'dashboard', 
      name: 'Overview', 
      icon: DollarSign,
      href: `/organizations/${organizationId}/payroll`,
      exact: true,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
    { 
      id: 'processing', 
      name: 'Pay Processing', 
      icon: Clock,
      href: `/organizations/${organizationId}/payroll/processing`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
    { 
      id: 'employees', 
      name: 'Employee Pay', 
      icon: Users,
      href: `/organizations/${organizationId}/payroll/employees`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
    { 
      id: 'calculators', 
      name: 'Calculators', 
      icon: Calculator,
      href: `/organizations/${organizationId}/payroll/calculators`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'EMPLOYEE']
    },
    { 
      id: 'reports', 
      name: 'Reports & Filing', 
      icon: FileText,
      href: `/organizations/${organizationId}/payroll/reports`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
    { 
      id: 'calendar', 
      name: 'Pay Calendar', 
      icon: Calendar,
      href: `/organizations/${organizationId}/payroll/calendar`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Settings,
      href: `/organizations/${organizationId}/payroll/settings`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
  ];

  // Filter tabs based on user role
  const visibleTabs = tabs.filter(tab => {
    if (user?.role === 'SUPER_ADMIN') return true;
    return tab.roles.includes(user?.role || '');
  });

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px overflow-x-auto">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact 
            ? location.pathname === tab.href
            : location.pathname.startsWith(tab.href);
          
          return (
            <Link
              key={tab.id}
              to={tab.href}
              className={cn(
                'group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap',
                isActive
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <Icon className={cn(
                '-ml-1 mr-2 h-5 w-5',
                isActive 
                  ? 'text-indigo-500' 
                  : 'text-gray-400 group-hover:text-gray-500'
              )} />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export { PayrollNav };
export default PayrollNav;