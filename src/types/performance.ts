import { User } from './auth';

export type ReviewStatus = 'DRAFT' | 'PENDING' | 'COMPLETED';
export type ReviewType = 'ANNUAL' | 'QUARTERLY' | 'PROBATION' | 'PROJECT';
export type RatingScale = 1 | 2 | 3 | 4 | 5;
export type ScheduleStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ReviewSchedule {
  id: string;
  employeeId: string;
  type: ReviewType;
  frequency: number; // in months
  durationDays: number;
  lastReviewDate: string | null;
  nextReviewDate: string;
  status: ScheduleStatus;
  notificationsSent: {
    type: 'UPCOMING' | 'OVERDUE';
    sentAt: string;
  }[];
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  type: ReviewType;
  period: {
    startDate: string;
    endDate: string;
  };
  status: ReviewStatus;
  ratings: {
    category: string;
    rating: RatingScale;
    comments: string;
  }[];
  goals: string[];
  overallRating: RatingScale;
  strengths: string[];
  improvements: string[];
  comments?: string;
  createdAt: string;
  updatedAt: string;
  scheduleId?: string;
}

export interface PerformanceGoal {
  id: string;
  employeeId: string;
  description: string;
  category: 'PROFESSIONAL' | 'PERSONAL' | 'PROJECT';
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  progress: number;
  metrics: string[];
  feedback: {
    id: string;
    userId: string;
    comment: string;
    createdAt: string;
  }[];
}

export interface SkillAssessment {
  id: string;
  employeeId: string;
  skills: {
    name: string;
    category: string;
    proficiency: RatingScale;
    lastUpdated: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    dateObtained: string;
    expiryDate?: string;
    status: 'ACTIVE' | 'EXPIRED';
  }[];
}