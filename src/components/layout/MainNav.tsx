import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { mainNavLinks, type NavLink } from '../../lib/utils/links';
import { userAtom } from '../../lib/auth';
import { cn } from '../../lib/utils';

export default function MainNav() {
  const location = useLocation();
  const [user] = useAtom(userAtom);

  // Filter navigation links based on user's role
  const filteredLinks = mainNavLinks.filter(link => 
    link.roles.includes(user?.role || '')
  );

  // Get organization-specific links
  const orgLinks = user?.organizationId ? [
    {
      name: 'Payroll',
      href: `/organizations/${user.organizationId}/payroll`,
      icon: mainNavLinks.find(l => l.name === 'Payroll')?.icon,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'EMPLOYEE']
    },
    {
      name: 'Recruitment',
      href: `/organizations/${user.organizationId}/recruitment`,
      icon: mainNavLinks.find(l => l.name === 'Recruitment')?.icon,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
    },
    {
      name: 'Safety',
      href: `/organizations/${user.organizationId}/safety`,
      icon: mainNavLinks.find(l => l.name === 'Safety')?.icon,
      roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR']
    }
  ] as NavLink[] : [];

  // Filter organization links based on user role
  const visibleOrgLinks = orgLinks.filter(link => 
    link.roles.includes(user?.role || '')
  );

  // Combine and filter out duplicate links
  const allLinks = [
    ...filteredLinks.filter(link => !['Payroll', 'Recruitment', 'Safety'].includes(link.name)),
    ...visibleOrgLinks
  ];

  return (
    <nav className="flex flex-col space-y-1">
      {allLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.href || 
                        (link.href !== '/' && location.pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {Icon && <Icon className={cn(
              'h-5 w-5',
              isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
            )} />}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}