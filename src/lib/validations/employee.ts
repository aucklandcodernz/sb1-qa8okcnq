import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email format'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY']),
  departmentId: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED']),
  salary: z.object({
    amount: z.number().min(0, 'Salary must be a positive number'),
    currency: z.string().min(1, 'Currency is required'),
  }),
  bankDetails: z.object({
    accountName: z.string().min(1, 'Account name is required'),
    accountNumber: z.string().min(1, 'Account number is required'),
    bankName: z.string().min(1, 'Bank name is required'),
  }).optional(),
  version: z.number().optional(),
});

export const employeeUpdateSchema = employeeSchema.partial().extend({
  id: z.string(),
  version: z.number()
});