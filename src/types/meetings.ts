import { Role } from './auth';

export type MeetingType = 'DISCIPLINARY' | 'PERFORMANCE_REVIEW' | 'TRAINING' | 'GENERAL';
export type MeetingStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type MeetingLocation = 'IN_PERSON' | 'VIDEO' | 'PHONE';

export interface Meeting {
  id: string;
  type: MeetingType;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location: MeetingLocation;
  locationDetails?: {
    room?: string;
    address?: string;
    videoLink?: string;
    phoneNumber?: string;
  };
  organizer: {
    id: string;
    name: string;
    role: Role;
  };
  attendees: {
    id: string;
    name: string;
    role: Role;
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'TENTATIVE';
    responseDate?: string;
  }[];
  agenda?: {
    id: string;
    title: string;
    duration: number;
  }[];
  documents?: {
    id: string;
    title: string;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
  }[];
  notes?: {
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }[];
  status: MeetingStatus;
  createdAt: string;
  updatedAt: string;
  relatedTo?: {
    type: 'DISCIPLINARY' | 'PERFORMANCE_REVIEW' | 'TRAINING';
    id: string;
  };
}

export interface CreateMeetingData {
  type: MeetingType;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location: MeetingLocation;
  locationDetails?: Meeting['locationDetails'];
  attendees: string[];
  agenda?: { title: string; duration: number }[];
  relatedTo?: Meeting['relatedTo'];
}