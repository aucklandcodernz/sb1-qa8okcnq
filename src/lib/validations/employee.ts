
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
export const employeeQualificationSchema = z.object({
  qualificationId: z.string().optional(),
  title: z.string().min(2, 'Qualification title is required'),
  institution: z.string().min(2, 'Institution name is required'),
  dateObtained: z.string().transform(str => new Date(str)),
  expiryDate: z.string().optional().transform(str => str ? new Date(str) : null),
  verificationStatus: z.enum(['PENDING', 'VERIFIED', 'REJECTED']).default('PENDING'),
  notes: z.string().optional(),
  attachments: z.array(z.string()).optional()
});
