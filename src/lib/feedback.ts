import { atom } from 'jotai';
import { FeedbackQuestion, FeedbackRequest, FeedbackSummary } from '../types/feedback';

export const feedbackQuestionsAtom = atom<FeedbackQuestion[]>([
  {
    id: 'q1',
    category: 'Communication',
    question: 'How effectively does this person communicate with team members?',
    type: 'RATING',
  },
  {
    id: 'q2',
    category: 'Communication',
    question: 'What could this person do to improve their communication?',
    type: 'TEXT',
  },
  {
    id: 'q3',
    category: 'Technical Skills',
    question: 'How would you rate this person\'s technical expertise?',
    type: 'RATING',
  },
  {
    id: 'q4',
    category: 'Technical Skills',
    question: 'What technical areas could this person improve?',
    type: 'TEXT',
  },
  {
    id: 'q5',
    category: 'Leadership',
    question: 'How effectively does this person lead and inspire others?',
    type: 'RATING',
  },
  {
    id: 'q6',
    category: 'Leadership',
    question: 'What leadership qualities could this person develop?',
    type: 'TEXT',
  },
]);

export const feedbackRequestsAtom = atom<FeedbackRequest[]>([]);

export const feedbackSummariesAtom = atom<FeedbackSummary[]>([]);

export const createFeedbackRequest = (
  employeeId: string,
  requesterId: string,
  type: 'SELF' | 'MANAGER' | 'PEER' | 'SUBORDINATE',
  dueDate: string
): FeedbackRequest => {
  const request: FeedbackRequest = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    requesterId,
    type,
    dueDate,
    status: 'PENDING',
    responses: [],
  };

  feedbackRequestsAtom.init = [...feedbackRequestsAtom.init, request];
  return request;
};

export const submitFeedback = (
  requestId: string,
  responses: { questionId: string; rating?: number; comment: string }[]
): void => {
  feedbackRequestsAtom.init = feedbackRequestsAtom.init.map(request =>
    request.id === requestId
      ? {
          ...request,
          responses,
          status: 'SUBMITTED',
          submittedAt: new Date().toISOString(),
        }
      : request
  );
};

export const generateFeedbackSummary = (
  employeeId: string,
  startDate: string,
  endDate: string
): FeedbackSummary => {
  // In a real implementation, this would aggregate all feedback
  // and generate meaningful insights
  const summary: FeedbackSummary = {
    employeeId,
    period: { startDate, endDate },
    ratings: [
      {
        category: 'Communication',
        averageRating: 4.2,
        responses: 5,
      },
      {
        category: 'Technical Skills',
        averageRating: 4.5,
        responses: 5,
      },
      {
        category: 'Leadership',
        averageRating: 3.8,
        responses: 5,
      },
    ],
    strengths: [
      'Strong technical expertise',
      'Clear communication',
      'Problem-solving ability',
    ],
    improvements: [
      'Delegation skills',
      'Strategic planning',
      'Meeting facilitation',
    ],
  };

  feedbackSummariesAtom.init = [...feedbackSummariesAtom.init, summary];
  return summary;
};