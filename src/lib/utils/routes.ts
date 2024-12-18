import { Role } from '../types/auth';

export interface RouteConfig {
  path: string;
  component: string;
  roles: Role[];
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: '/login',
    component: 'Login',
    roles: []
  },
  {
    path: '/dashboard',
    component: 'Dashboard',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE', 'STAKEHOLDER']
  },
  {
    path: '/organizations',
    component: 'Organizations',
    roles: ['SUPER_ADMIN']
  },
  {
    path: '/organizations/:id',
    component: 'OrganizationDetails',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN']
  },
  {
    path: '/users',
    component: 'Users',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
  },
  {
    path: '/leave',
    component: 'LeaveManagement',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  {
    path: '/attendance',
    component: 'TimeAndAttendance',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  {
    path: '/performance/*',
    component: 'Performance',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  {
    path: '/training',
    component: 'Training',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  {
    path: '/documents',
    component: 'Documents',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'EMPLOYEE']
  },
  {
    path: '/reports',
    component: 'Reports',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER']
  },
  {
    path: '/settings',
    component: 'Settings',
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
  }
];