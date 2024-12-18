import { atom } from 'jotai';
import { Organization, OrganizationDetails } from '../types/organization';

export const organizationsAtom = atom<Organization[]>([
  {
    id: '1',
    name: 'Acme Corporation',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'TechStart Inc',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
]);

export const organizationDetailsAtom = atom<Record<string, OrganizationDetails>>({
  '1': {
    id: '1',
    name: 'Acme Corporation',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    adminId: 'admin1',
    departments: [
      {
        id: 'd1',
        name: 'Engineering',
        organizationId: '1',
        managerId: 'manager1',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'd2',
        name: 'Human Resources',
        organizationId: '1',
        managerId: 'manager2',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
    ],
    employees: [
      {
        id: 'emp1',
        email: 'john@acme.com',
        firstName: 'John',
        lastName: 'Smith',
        role: 'DEPT_MANAGER',
        organizationId: '1',
        departmentId: 'd1',
      },
      {
        id: 'emp2',
        email: 'jane@acme.com',
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'HR_MANAGER',
        organizationId: '1',
        departmentId: 'd2',
      },
      {
        id: 'emp1',
        email: 'john@acme.com',
        firstName: 'John',
        lastName: 'Smith',
        role: 'DEPT_MANAGER',
        organizationId: '1',
        departmentId: 'd1',
      },
      {
        id: 'emp2',
        email: 'jane@acme.com',
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'HR_MANAGER',
        organizationId: '1',
        departmentId: 'd2',
      },
    ],
  },
});