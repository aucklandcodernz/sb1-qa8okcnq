import { User } from './auth';

export interface Department {
  id: string;
  name: string;
  organizationId: string;
  managerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationDetails extends Organization {
  departments: Department[];
  employees: User[];
  adminId: string;
}

export interface CreateOrganizationData {
  name: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
}