import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Briefcase, Users, CheckSquare } from 'lucide-react';
import { userAtom } from '../../lib/auth';
import { cn } from '../../lib/utils';

interface RecruitmentNavProps {
  organizationId: string;
}

export default function RecruitmentNav({ organizationId }: RecruitmentNavProps) {
  const location = useLocation();
  const [user] = useAtom(userAtom);
  
  const tabs = [
    {
      id: 'jobs',
      name: 'Job Postings',
      icon: Briefcase,
      href: `/organizations/${organizationId}/recruitment`,
      exact: true,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
    {
      id: 'applications',
      name: 'Applications',
      icon: Users,
      href: `/organizations/${organizationId}/recruitment/applications`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER']
    },
    {
      id: 'onboarding',
      name: 'Onboarding',
      icon: CheckSquare,
      href: `/organizations/${organizationId}/recruitment/onboarding`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    }
  ];

  // Filter tabs based on user role
  const visibleTabs = tabs.filter(tab => {
    if (user?.role === 'SUPER_ADMIN') return true;
    return tab.roles.includes(user?.role || '');
  });

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
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