
import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email format'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY']),
  departmentId: z.string().optional(),
  startDate: z.date(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED']),
  version: z.number().optional()
});

export const employeeUpdateSchema = employeeSchema.partial().extend({
  id: z.string(),
  version: z.number()
});

export const auditLogSchema = z.object({
  action: z.enum(['CREATE', 'UPDATE', 'DELETE']),
  details: z.record(z.unknown()),
  performedBy: z.string()
});
