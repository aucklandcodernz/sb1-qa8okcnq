import { atom } from 'jotai';
import { UserProfile } from '../types/user';

export const usersAtom = atom<UserProfile[]>([
  {
    id: 'super-admin',
    email: 'admin@askyourhr.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPER_ADMIN',
    joinDate: '2024-01-01',
    status: 'ACTIVE',
  },
  {
    id: 'org-admin-1',
    email: 'admin@acme.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'ORG_ADMIN',
    organizationId: '1',
    joinDate: '2024-01-15',
    status: 'ACTIVE',
    phoneNumber: '+1234567890',
  },
]);