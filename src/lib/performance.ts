import { atom } from 'jotai';
import { PerformanceGoal, SkillAssessment, PerformanceReview } from '../types/performance';

export const performanceReviewsAtom = atom<PerformanceReview[]>([
  {
    id: '1',
    employeeId: 'emp1',
    reviewerId: 'manager1',
    type: 'QUARTERLY',
    period: {
      startDate: '2024-01-01',
      endDate: '2024-03-31',
    },
    status: 'COMPLETED',
    ratings: [
      {
        category: 'Job Knowledge',
        rating: 4,
        comments: 'Shows excellent understanding of technical concepts',
      },
      {
        category: 'Quality of Work',
        rating: 4,
        comments: 'Consistently delivers high-quality code',
      },
      {
        category: 'Communication',
        rating: 3,
        comments: 'Good team communication, can improve documentation',
      },
    ],
    goals: ['Complete React certification', 'Improve documentation practices'],
    overallRating: 4,
    strengths: ['Technical expertise', 'Problem-solving'],
    improvements: ['Documentation', 'Knowledge sharing'],
    comments: 'Strong performer with good technical skills',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
  }
]);

export const performanceGoalsAtom = atom<PerformanceGoal[]>([
  {
    id: '1',
    employeeId: 'emp1',
    description: 'Complete Advanced React Certification',
    category: 'PROFESSIONAL',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2024-06-30',
    progress: 60,
    metrics: ['Pass all course modules', 'Complete final project', 'Submit certification exam'],
    feedback: [
      {
        id: 'f1',
        userId: 'manager1',
        comment: 'Making good progress on the course modules',
        createdAt: '2024-03-01',
      }
    ],
  },
  {
    id: '2',
    employeeId: 'emp1',
    description: 'Improve Team Communication Skills',
    category: 'PERSONAL',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2024-12-31',
    progress: 40,
    metrics: ['Attend communication workshop', 'Lead team meetings', 'Gather peer feedback'],
    feedback: [],
  }
]);

export const skillAssessmentsAtom = atom<SkillAssessment[]>([
  {
    id: '1',
    employeeId: 'emp1',
    skills: [
      {
        name: 'React',
        category: 'Frontend Development',
        proficiency: 4,
        lastUpdated: '2024-03-01',
      },
      {
        name: 'TypeScript',
        category: 'Frontend Development',
        proficiency: 4,
        lastUpdated: '2024-03-01',
      },
      {
        name: 'Node.js',
        category: 'Backend Development',
        proficiency: 3,
        lastUpdated: '2024-03-01',
      },
      {
        name: 'AWS',
        category: 'Cloud Services',
        proficiency: 3,
        lastUpdated: '2024-03-01',
      }
    ],
    certifications: [
      {
        name: 'React Developer Certification',
        issuer: 'Meta',
        dateObtained: '2023-12-15',
        status: 'ACTIVE',
      },
      {
        name: 'AWS Cloud Practitioner',
        issuer: 'Amazon Web Services',
        dateObtained: '2023-06-01',
        expiryDate: '2026-06-01',
        status: 'ACTIVE',
      }
    ],
  }
]);