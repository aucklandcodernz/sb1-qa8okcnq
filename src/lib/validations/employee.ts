
import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address').max(255),
  position: z.string().min(2, 'Position is required').max(100),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY']),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  salary: z.number().positive().optional(),
  taxId: z.string().optional(),
  departmentId: z.string().optional(),
  managerId: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED']).default('ACTIVE'),
  organizationId: z.string().min(1, 'Organization ID is required')
});

export type CreateEmployeeInput = z.infer<typeof employeeSchema>;
