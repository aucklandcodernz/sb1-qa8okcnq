import { Role } from './auth';

export type FeedbackType = 'SELF' | 'MANAGER' | 'PEER' | 'SUBORDINATE';
export type FeedbackStatus = 'PENDING' | 'SUBMITTED' | 'REVIEWED';

export interface FeedbackQuestion {
  id: string;
  category: string;
  question: string;
  type: 'RATING' | 'TEXT';
}

export interface FeedbackResponse {
  questionId: string;
  rating?: number;
  comment: string;
}

export interface FeedbackRequest {
  id: string;
  employeeId: string;
  requesterId: string;
  type: FeedbackType;
  dueDate: string;
  status: FeedbackStatus;
  responses: FeedbackResponse[];
  submittedAt?: string;
  reviewedAt?: string;
}

export interface FeedbackSummary {
  employeeId: string;
  period: {
    startDate: string;
    endDate: string;
  };
  ratings: {
    category: string;
    averageRating: number;
    responses: number;
  }[];
  strengths: string[];
  improvements: string[];
}