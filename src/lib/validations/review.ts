
import { z } from 'zod';

export const performanceReviewSchema = z.object({
  employeeId: z.string(),
  reviewDate: z.string(),
  rating: z.string().min(1).max(5),
  comments: z.string().min(1, 'Comments are required'),
  reviewerId: z.string().optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']).default('DRAFT')
});

export type PerformanceReview = z.infer<typeof performanceReviewSchema>;
