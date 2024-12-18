import { Role } from './auth';

export type EvaluationStatus = 'DRAFT' | 'SUBMITTED' | 'REVIEWED';
export type EvaluationCriteria = 'TECHNICAL_SKILLS' | 'COMMUNICATION' | 'PROBLEM_SOLVING' | 'CULTURAL_FIT' | 'LEADERSHIP' | 'EXPERIENCE';
export type RecommendationStatus = 'STRONG_HIRE' | 'HIRE' | 'NO_HIRE' | 'STRONG_NO_HIRE';

export interface CriteriaRating {
  criteria: EvaluationCriteria;
  rating: number;
  comments: string;
}

export interface CandidateEvaluation {
  id: string;
  applicationId: string;
  interviewId: string;
  evaluatorId: string;
  evaluatorRole: Role;
  ratings: CriteriaRating[];
  strengths: string[];
  weaknesses: string[];
  overallComments: string;
  recommendation: RecommendationStatus;
  status: EvaluationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEvaluationData {
  applicationId: string;
  interviewId: string;
  ratings: CriteriaRating[];
  strengths: string[];
  weaknesses: string[];
  overallComments: string;
  recommendation: RecommendationStatus;
}