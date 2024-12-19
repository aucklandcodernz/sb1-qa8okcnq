
import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().max(255),
  position: z.string().min(2).max(100),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY"]),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ON_LEAVE", "TERMINATED"]),
  departmentId: z.string().optional(),
  managerId: z.string().optional(),
  statusHistory: z.array(z.object({
    status: z.string(),
    date: z.date(),
    reason: z.string().optional()
  })).optional(),
  departmentHistory: z.array(z.object({
    departmentId: z.string(),
    startDate: z.date(),
    endDate: z.date().optional()
  })).optional()
});

export type CreateEmployeeInput = z.infer<typeof employeeSchema>;
