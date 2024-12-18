import { atom } from 'jotai';
import { User } from '../types/auth';

export const userAtom = atom<User | null>(null);

// Test users for each role
export const TEST_USERS: Record<string, User> = {
  'super-admin': {
    id: 'super-admin',
    email: 'admin@askyourhr.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPER_ADMIN',
  },
  'org-admin': {
    id: 'org-admin',
    email: 'org.admin@acme.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'ORG_ADMIN',
    organizationId: '1',
  },
  'hr-manager': {
    id: 'hr-manager',
    email: 'hr.manager@acme.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'HR_MANAGER',
    organizationId: '1',
    departmentId: 'd2',
  },
  'dept-manager': {
    id: 'dept-manager',
    email: 'dept.manager@acme.com',
    firstName: 'Michael',
    lastName: 'Brown',
    role: 'DEPT_MANAGER',
    organizationId: '1',
    departmentId: 'd1',
  },
  'supervisor': {
    id: 'supervisor',
    email: 'supervisor@acme.com',
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'SUPERVISOR',
    organizationId: '1',
    departmentId: 'd1',
  },
  'employee': {
    id: 'employee',
    email: 'employee@acme.com',
    firstName: 'David',
    lastName: 'Wilson',
    role: 'EMPLOYEE',
    organizationId: '1',
    departmentId: 'd1',
  },
  'stakeholder': {
    id: 'stakeholder',
    email: 'stakeholder@acme.com',
    firstName: 'Lisa',
    lastName: 'Taylor',
    role: 'STAKEHOLDER',
    organizationId: '1',
  },
};

export const checkPermission = (requiredRole: string[], userRole: string): boolean => {
  const roleHierarchy: Record<string, number> = {
    'SUPER_ADMIN': 100,
    'ORG_ADMIN': 80,
    'HR_MANAGER': 60,
    'DEPT_MANAGER': 40,
    'SUPERVISOR': 30,
    'EMPLOYEE': 20,
    'STAKEHOLDER': 10
  };

  const userRoleLevel = roleHierarchy[userRole] || 0;
  return requiredRole.some(role => userRoleLevel >= (roleHierarchy[role] || 0));
};

export const logout = (setUser: (user: User | null) => void) => {
  setUser(null);
  // In a real app, you would also:
  // - Clear any auth tokens from localStorage/cookies
  // - Call a logout API endpoint
  // - Clear any sensitive data from the client
};