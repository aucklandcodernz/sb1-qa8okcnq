import { atom } from 'jotai';
import { Course, TrainingSession, CourseEnrollment, TrainingCertificate } from '../types/training';

export const coursesAtom = atom<Course[]>([
  {
    id: 'course1',
    organizationId: '1',
    title: 'Introduction to Workplace Safety',
    description: 'Essential workplace safety training for all employees',
    category: 'Safety',
    duration: 4,
    status: 'PUBLISHED',
    instructor: {
      id: 'inst1',
      name: 'John Smith',
      title: 'Safety Coordinator',
      bio: '10+ years of experience in workplace safety training',
    },
    objectives: [
      'Understand basic workplace safety principles',
      'Identify common workplace hazards',
      'Learn emergency procedures',
    ],
    materials: [
      {
        id: 'mat1',
        title: 'Safety Guidelines Handbook',
        type: 'PDF',
        url: '/materials/safety-handbook.pdf',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]);

export const trainingSessionsAtom = atom<TrainingSession[]>([
  {
    id: 'session1',
    courseId: 'course1',
    type: 'HYBRID',
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-03-15T13:00:00Z',
    capacity: 20,
    location: {
      name: 'Main Office',
      address: '123 Business St',
      room: 'Training Room A',
    },
    virtualMeetingUrl: 'https://meet.example.com/safety-training',
    enrolledParticipants: ['emp1', 'emp2'],
    status: 'SCHEDULED',
  },
]);

export const courseEnrollmentsAtom = atom<CourseEnrollment[]>([
  {
    id: 'enroll1',
    userId: 'emp1',
    courseId: 'course1',
    sessionId: 'session1',
    status: 'ENROLLED',
    progress: 0,
    startDate: '2024-03-15T09:00:00Z',
    assessmentScores: [],
  },
]);

export const trainingCertificatesAtom = atom<TrainingCertificate[]>([]);

export const createCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course => {
  const newCourse: Course = {
    ...courseData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  coursesAtom.init = [...coursesAtom.init, newCourse];
  return newCourse;
};

export const createTrainingSession = (sessionData: Omit<TrainingSession, 'id' | 'enrolledParticipants'>): TrainingSession => {
  const newSession: TrainingSession = {
    ...sessionData,
    id: Math.random().toString(36).substr(2, 9),
    enrolledParticipants: [],
  };

  trainingSessionsAtom.init = [...trainingSessionsAtom.init, newSession];
  return newSession;
};

export const enrollInCourse = (
  userId: string,
  courseId: string,
  sessionId: string
): CourseEnrollment => {
  const enrollment: CourseEnrollment = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    courseId,
    sessionId,
    status: 'ENROLLED',
    progress: 0,
    startDate: new Date().toISOString(),
    assessmentScores: [],
  };

  courseEnrollmentsAtom.init = [...courseEnrollmentsAtom.init, enrollment];
  
  // Update session participants
  trainingSessionsAtom.init = trainingSessionsAtom.init.map(session =>
    session.id === sessionId
      ? {
          ...session,
          enrolledParticipants: [...session.enrolledParticipants, userId],
        }
      : session
  );

  return enrollment;
};

export const updateEnrollmentProgress = (
  enrollmentId: string,
  progress: number,
  moduleId?: string,
  assessmentScore?: number
): void => {
  courseEnrollmentsAtom.init = courseEnrollmentsAtom.init.map(enrollment => {
    if (enrollment.id !== enrollmentId) return enrollment;

    const updatedEnrollment = { ...enrollment, progress };

    if (moduleId && assessmentScore !== undefined) {
      updatedEnrollment.assessmentScores = [
        ...enrollment.assessmentScores,
        {
          moduleId,
          score: assessmentScore,
          completedAt: new Date().toISOString(),
        },
      ];
    }

    if (progress === 100) {
      updatedEnrollment.status = 'COMPLETED';
      updatedEnrollment.completionDate = new Date().toISOString();
    }

    return updatedEnrollment;
  });
};

export const issueCertificate = (
  userId: string,
  courseId: string
): TrainingCertificate => {
  const certificate: TrainingCertificate = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    courseId,
    issueDate: new Date().toISOString(),
    certificateUrl: `/certificates/${courseId}-${userId}.pdf`,
    validationCode: Math.random().toString(36).substr(2, 16).toUpperCase(),
    status: 'VALID',
  };

  trainingCertificatesAtom.init = [...trainingCertificatesAtom.init, certificate];
  return certificate;
};