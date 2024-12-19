
import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(2, 'Position is required'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT']),
  startDate: z.date(),
  departmentId: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE']).default('ACTIVE'),
  organizationId: z.string().min(1, 'Organization ID is required')
});

export const employeeSkillSchema = z.object({
  name: z.string().min(2, 'Skill name is required'),
  proficiencyLevel: z.number().min(1).max(5),
  lastUsed: z.date().optional()
});

export type CreateEmployeeInput = z.infer<typeof employeeSchema>;
export type EmployeeSkillInput = z.infer<typeof employeeSkillSchema>;
