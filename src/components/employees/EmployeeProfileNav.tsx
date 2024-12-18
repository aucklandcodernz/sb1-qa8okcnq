import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { 
  User, 
  FileText, 
  GraduationCap, 
  Clock, 
  Calendar, 
  DollarSign, 
  BookOpen,
  ScrollText,
  BadgeCheck
} from 'lucide-react';
import { userAtom } from '../../lib/auth';
import { cn } from '../../lib/utils';

interface EmployeeProfileNavProps {
  employeeId: string;
}

export default function EmployeeProfileNav({ employeeId }: EmployeeProfileNavProps) {
  const location = useLocation();
  const [user] = useAtom(userAtom);

  const tabs = [
    {
      name: 'Overview',
      href: `/employees/${employeeId}`,
      icon: User,
      exact: true,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
    },
    {
      name: 'Documents',
      href: `/employees/${employeeId}/documents`,
      icon: FileText,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'EMPLOYEE']
    },
    {
      name: 'Agreements',
      href: `/employees/${employeeId}/agreements`,
      icon: ScrollText,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'EMPLOYEE']
    },
    {
      name: 'Qualifications',
      href: `/employees/${employeeId}/qualifications`,
      icon: GraduationCap,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
    },
    {
      name: 'Training',
      href: `/employees/${employeeId}/training`,
      icon: BookOpen,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
    },
    {
      name: 'Attendance',
      href: `/employees/${employeeId}/attendance`,
      icon: Clock,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
    },
    {
      name: 'Leave',
      href: `/employees/${employeeId}/leave`,
      icon: Calendar,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
    },
    {
      name: 'Visa',
      href: `/employees/${employeeId}/visa`,
      icon: BadgeCheck,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'EMPLOYEE']
    },
    {
      name: 'Payroll',
      href: `/employees/${employeeId}/payroll`,
      icon: DollarSign,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    }
  ];

  // Filter tabs based on user role and permissions
  const visibleTabs = tabs.filter(tab => {
    // If user is viewing their own profile, show all relevant tabs
    if (user?.id === employeeId) {
      return tab.roles.includes('EMPLOYEE');
    }
    // Otherwise filter based on role
    return tab.roles.includes(user?.role || '');
  });

  return (
    <nav className="border-b border-gray-200">
      <div className="flex -mb-px overflow-x-auto">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact 
            ? location.pathname === tab.href
            : location.pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
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
      </div>
    </nav>
  );
}