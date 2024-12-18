import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Shield, AlertTriangle, FileText, BookOpen } from 'lucide-react';
import { userAtom } from '../../lib/auth';
import { cn } from '../../lib/utils';

interface SafetyNavProps {
  organizationId: string;
}

export default function SafetyNav({ organizationId }: SafetyNavProps) {
  const location = useLocation();
  const [user] = useAtom(userAtom);
  
  const tabs = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: Shield,
      href: `/organizations/${organizationId}/safety`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR']
    },
    { 
      id: 'accidents', 
      name: 'Accident Reports', 
      icon: AlertTriangle,
      href: `/organizations/${organizationId}/safety/accidents`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
    },
    { 
      id: 'hazards', 
      name: 'Hazard Management', 
      icon: FileText,
      href: `/organizations/${organizationId}/safety/hazards`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR']
    },
    { 
      id: 'training', 
      name: 'Training Records', 
      icon: BookOpen,
      href: `/organizations/${organizationId}/safety/training`,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
    },
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
          const isActive = location.pathname === tab.href || 
                          (tab.id === 'dashboard' && location.pathname.endsWith('/safety'));
          
          return (
            <Link
              key={tab.id}
              to={tab.href}
              className={cn(
                'group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm',
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