
import { z } from 'zod';

export const documentStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'EXPIRED']),
  documentType: z.string(),
  expiryDate: z.string().optional(),
  comments: z.string().optional(),
  updatedAt: z.string(),
});

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  profileImage: z.string().optional(),
  departmentId: z.string().optional(),
  position: z.string().min(2, 'Position is required'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT']),
  startDate: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED']).default('ACTIVE')
});

export const employeeUpdateSchema = employeeSchema.partial();
