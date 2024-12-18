export type Role = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'HR_MANAGER' | 'DEPT_MANAGER' | 'SUPERVISOR' | 'EMPLOYEE' | 'STAKEHOLDER';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  organizationId?: string;
  departmentId?: string;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}