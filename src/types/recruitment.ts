import { Role } from './auth';

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ON_HOLD';
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
export type ApplicationStatus = 'NEW' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';
export type InterviewType = 'PHONE' | 'VIDEO' | 'IN_PERSON';
export type InterviewStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface JobPosting {
  id: string;
  organizationId: string;
  departmentId: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  type: JobType;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  closingDate?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidate: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    resumeUrl: string;
    coverLetterUrl?: string;
  };
  status: ApplicationStatus;
  appliedAt: string;
  interviews: {
    id: string;
    type: InterviewType;
    scheduledAt: string;
    status: InterviewStatus;
    feedback?: {
      rating: number;
      recommendation: string;
    };
  }[];
  notes: {
    id: string;
    content: string;
    createdAt: string;
  }[];
}

export interface CreateJobPostingData {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  type: JobType;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  benefits?: string[];
  closingDate?: string;
}