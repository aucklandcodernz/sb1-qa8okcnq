
import { z } from 'zod';

export const skillAssessmentSchema = z.object({
  skillName: z.string().min(2, 'Skill name must be at least 2 characters'),
  level: z.number().min(1).max(5),
  notes: z.string().optional(),
  reason: z.string().optional(),
  assessedBy: z.string().min(1, 'Assessor is required'),
});

export const skillHistorySchema = z.object({
  previousLevel: z.number().min(1).max(5),
  newLevel: z.number().min(1).max(5),
  reason: z.string().optional(),
  changedBy: z.string().min(1, 'Assessor is required'),
});

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY']),
  departmentId: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED']),
  skills: z.array(skillAssessmentSchema).optional(),
  version: z.number().optional(),
});

export const employeeUpdateSchema = employeeSchema.partial().extend({
  id: z.string(),
  version: z.number(),
});
