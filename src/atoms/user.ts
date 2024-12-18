
import { atom } from 'jotai';

export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'HR_MANAGER' | 'DEPT_MANAGER' | 'EMPLOYEE';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}

export const userAtom = atom<User | null>({
  id: '1',
  role: 'ORG_ADMIN',
  name: 'Admin User',
  email: 'admin@example.com'
});
