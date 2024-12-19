
import { z } from 'zod';

export const documentStatusSchema = z.object({
  documentType: z.string().min(1, 'Document type is required'),
  status: z.enum(['PENDING', 'APPROVED', 'EXPIRED']),
  expiryDate: z.string().optional(),
  notes: z.string().optional()
});

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  employeeId: z.string().min(4, 'Employee ID must be at least 4 characters'),
  position: z.string().min(2, 'Position is required'),
  departmentId: z.string().optional(),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY']),
  status: z.enum(['ACTIVE', 'PROBATION', 'ON_LEAVE', 'TERMINATED', 'SUSPENDED'])
});

export const employeeUpdateSchema = employeeSchema.partial();
import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(2, 'Position is required'),
  departmentId: z.string().optional(),
  organizationId: z.string(),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY']),
  status: z.enum(['ACTIVE', 'PROBATION', 'ON_LEAVE', 'TERMINATED', 'SUSPENDED']),
  taxCode: z.enum(['M', 'ME', 'SB', 'S', 'SH', 'ST', 'SA']).optional(), // NZ tax codes
  kiwiSaverContribution: z.number().min(0).max(0.10).optional(), // 0-10%
  bankAccountNumber: z.string().optional(),
});

export const employeeUpdateSchema = employeeSchema.partial();

export type Employee = z.infer<typeof employeeSchema>;
export type EmployeeUpdate = z.infer<typeof employeeUpdateSchema>;
