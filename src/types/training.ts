import { User } from './auth';

export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type EnrollmentStatus = 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
export type SessionType = 'ONLINE' | 'IN_PERSON' | 'HYBRID';

export interface Course {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in hours
  status: CourseStatus;
  instructor: {
    id: string;
    name: string;
    title: string;
    bio?: string;
  };
  prerequisites?: string[];
  objectives: string[];
  materials: {
    id: string;
    title: string;
    type: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface TrainingSession {
  id: string;
  courseId: string;
  type: SessionType;
  startDate: string;
  endDate: string;
  capacity: number;
  location?: {
    name: string;
    address: string;
    room?: string;
  };
  virtualMeetingUrl?: string;
  enrolledParticipants: string[]; // User IDs
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  sessionId: string;
  status: EnrollmentStatus;
  progress: number;
  startDate: string;
  completionDate?: string;
  assessmentScores: {
    moduleId: string;
    score: number;
    completedAt: string;
  }[];
  feedback?: {
    rating: number;
    comments: string;
    submittedAt: string;
  };
}

export interface TrainingCertificate {
  id: string;
  userId: string;
  courseId: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl: string;
  validationCode: string;
  status: 'VALID' | 'EXPIRED' | 'REVOKED';
}