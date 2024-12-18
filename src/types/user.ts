import { Role } from './auth';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  organizationId?: string;
  departmentId?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  joinDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  organizationId?: string;
  departmentId?: string;
  phoneNumber?: string;
}