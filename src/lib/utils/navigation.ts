import { Role } from '../../types/auth';

export const isLinkVisible = (userRole: Role | undefined, allowedRoles: Role[]): boolean => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};

export const isLinkActive = (pathname: string, href: string): boolean => {
  if (href === '/') return pathname === href;
  return pathname.startsWith(href);
};

export const getOrganizationLinks = (organizationId: string, userRole: Role) => {
  const links = [];
  
  if (isLinkVisible(userRole, ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'EMPLOYEE'])) {
    links.push({
      name: 'Payroll',
      href: `/organizations/${organizationId}/payroll`,
    });
  }

  if (isLinkVisible(userRole, ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'])) {
    links.push({
      name: 'Recruitment',
      href: `/organizations/${organizationId}/recruitment`,
    });
  }

  if (isLinkVisible(userRole, ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR'])) {
    links.push({
      name: 'Safety',
      href: `/organizations/${organizationId}/safety`,
    });
  }

  return links;
};