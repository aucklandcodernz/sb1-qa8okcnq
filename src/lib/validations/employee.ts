
import { z } from 'zod';

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
