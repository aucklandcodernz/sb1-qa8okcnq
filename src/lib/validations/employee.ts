
import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required')
});

export const bankDetailsSchema = z.object({
  accountName: z.string().min(1, 'Account name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  bankName: z.string().min(1, 'Bank name is required')
});

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
  phoneNumber: z.string().optional(),
  address: addressSchema.optional(),
  bankDetails: bankDetailsSchema.optional(),
  kiwiSaverRate: z.number().min(0.03).max(0.10).optional(),
  taxCode: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED']).default('ACTIVE'),
  organizationId: z.string().min(1, 'Organization ID is required')
});

export type CreateEmployeeInput = z.infer<typeof employeeSchema>;
