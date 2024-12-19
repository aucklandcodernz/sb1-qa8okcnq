
import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(2, 'Department is required'),
  organizationId: z.string().min(1, 'Organization ID is required')
});

export type EmployeeInput = z.infer<typeof employeeSchema>;
