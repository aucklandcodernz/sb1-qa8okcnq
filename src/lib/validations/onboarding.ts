
import { z } from 'zod';

export const onboardingSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']),
  completedTasks: z.number().min(0),
  totalTasks: z.number().min(1),
  currentPhase: z.string(),
  notes: z.string().optional(),
});

export const onboardingTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']),
  dueDate: z.string().datetime(),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
export type OnboardingTaskFormData = z.infer<typeof onboardingTaskSchema>;
