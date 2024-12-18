import { atom } from 'jotai';
import { addMonths, addDays, isAfter } from 'date-fns';
import { ReviewSchedule, ReviewType } from '../../types/performance';

export const reviewSchedulesAtom = atom<ReviewSchedule[]>([]);

export const scheduleTypes: Record<ReviewType, { frequency: number; durationDays: number }> = {
  ANNUAL: { frequency: 12, durationDays: 14 },
  QUARTERLY: { frequency: 3, durationDays: 7 },
  PROBATION: { frequency: 3, durationDays: 5 },
  PROJECT: { frequency: 0, durationDays: 5 }, // Project reviews are ad-hoc
};

export const createReviewSchedule = (
  employeeId: string,
  type: ReviewType,
  startDate: Date = new Date()
): ReviewSchedule => {
  const schedule = scheduleTypes[type];
  const nextReviewDate = schedule.frequency > 0 
    ? addMonths(startDate, schedule.frequency)
    : addDays(startDate, 30); // Default for project reviews

  const newSchedule: ReviewSchedule = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    type,
    frequency: schedule.frequency,
    durationDays: schedule.durationDays,
    lastReviewDate: null,
    nextReviewDate: nextReviewDate.toISOString(),
    status: 'SCHEDULED',
    notificationsSent: [],
  };

  reviewSchedulesAtom.init = [...reviewSchedulesAtom.init, newSchedule];
  return newSchedule;
};

export const updateReviewSchedule = (
  scheduleId: string,
  reviewDate: string
): void => {
  reviewSchedulesAtom.init = reviewSchedulesAtom.init.map(schedule => {
    if (schedule.id !== scheduleId) return schedule;

    const type = schedule.type;
    const frequency = scheduleTypes[type].frequency;
    const nextReviewDate = frequency > 0
      ? addMonths(new Date(reviewDate), frequency)
      : addDays(new Date(reviewDate), 30);

    return {
      ...schedule,
      lastReviewDate: reviewDate,
      nextReviewDate: nextReviewDate.toISOString(),
      status: 'SCHEDULED',
      notificationsSent: [],
    };
  });
};

export const checkOverdueReviews = (): string[] => {
  const now = new Date();
  const overdueSchedules = reviewSchedulesAtom.init.filter(schedule => 
    schedule.status === 'SCHEDULED' &&
    isAfter(now, new Date(schedule.nextReviewDate))
  );
  return overdueSchedules.map(schedule => schedule.id);
};

export const sendReviewNotification = (
  scheduleId: string,
  notificationType: 'UPCOMING' | 'OVERDUE'
): void => {
  reviewSchedulesAtom.init = reviewSchedulesAtom.init.map(schedule => {
    if (schedule.id !== scheduleId) return schedule;

    return {
      ...schedule,
      notificationsSent: [...schedule.notificationsSent, {
        type: notificationType,
        sentAt: new Date().toISOString(),
      }],
    };
  });
};