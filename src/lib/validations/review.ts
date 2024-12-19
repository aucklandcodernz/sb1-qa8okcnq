
import { z } from 'zod';

export const performanceReviewSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  reviewerId: z.string().min(1, "Reviewer ID is required"),
  reviewDate: z.date(),
  rating: z.number().min(1).max(5),
  comments: z.string().optional(),
  goals: z.record(z.any()).optional(),
  skillAssessments: z.record(z.any()).optional(),
  status: z.enum(["DRAFT", "IN_REVIEW", "COMPLETED", "ARCHIVED"]),
  nextReviewDate: z.date().optional(),
  category: z.enum(["ANNUAL", "QUARTERLY", "PROBATION", "PROJECT"]),
  improvement: z.array(z.string()),
  metrics: z.record(z.any()).optional(),
  acknowledgement: z.boolean().default(false),
  discussionNotes: z.string().optional(),
  department: z.string().optional(),
  overallPerformance: z.enum(["EXCELLENT", "GOOD", "SATISFACTORY", "NEEDS_IMPROVEMENT", "UNSATISFACTORY"]).optional(),
  reviewCycle: z.string().optional(),
  score: z.number().min(0).max(5).optional(),
  competencies: z.record(z.any()).optional(),
  developmentPlans: z.record(z.any()).optional(),
  achievements: z.record(z.any()).optional()
});

export type CreateReviewInput = z.infer<typeof performanceReviewSchema>;
