import { atom } from 'jotai';
import { Meeting, CreateMeetingData } from '../types/meetings';
import { Role } from '../types/auth';

export const meetingsAtom = atom<Meeting[]>([]);

export const createMeeting = (
  data: CreateMeetingData,
  organizer: { id: string; name: string; role: Role }
): Meeting => {
  const newMeeting: Meeting = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    organizer,
    attendees: data.attendees.map(id => ({
      id,
      name: 'Attendee Name', // In a real app, fetch from user service
      role: 'EMPLOYEE' as Role,
      status: 'PENDING',
    })),
    status: 'SCHEDULED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  meetingsAtom.init = [...meetingsAtom.init, newMeeting];
  return newMeeting;
};

export const updateMeetingStatus = (
  meetingId: string,
  status: Meeting['status']
): void => {
  meetingsAtom.init = meetingsAtom.init.map(meeting =>
    meeting.id === meetingId
      ? { ...meeting, status, updatedAt: new Date().toISOString() }
      : meeting
  );
};

export const updateAttendeeResponse = (
  meetingId: string,
  attendeeId: string,
  status: 'ACCEPTED' | 'DECLINED' | 'TENTATIVE'
): void => {
  meetingsAtom.init = meetingsAtom.init.map(meeting =>
    meeting.id === meetingId
      ? {
          ...meeting,
          attendees: meeting.attendees.map(attendee =>
            attendee.id === attendeeId
              ? {
                  ...attendee,
                  status,
                  responseDate: new Date().toISOString(),
                }
              : attendee
          ),
          updatedAt: new Date().toISOString(),
        }
      : meeting
  );
};

export const addMeetingNote = (
  meetingId: string,
  content: string,
  createdBy: string
): void => {
  meetingsAtom.init = meetingsAtom.init.map(meeting =>
    meeting.id === meetingId
      ? {
          ...meeting,
          notes: [
            ...(meeting.notes || []),
            {
              id: Math.random().toString(36).substr(2, 9),
              content,
              createdBy,
              createdAt: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : meeting
  );
};

export const addMeetingDocument = (
  meetingId: string,
  document: {
    title: string;
    url: string;
    uploadedBy: string;
  }
): void => {
  meetingsAtom.init = meetingsAtom.init.map(meeting =>
    meeting.id === meetingId
      ? {
          ...meeting,
          documents: [
            ...(meeting.documents || []),
            {
              id: Math.random().toString(36).substr(2, 9),
              ...document,
              uploadedAt: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : meeting
  );
};

export const getUserMeetings = (
  userId: string,
  startDate?: Date,
  endDate?: Date
): Meeting[] => {
  return meetingsAtom.init.filter(meeting => {
    const isParticipant = 
      meeting.organizer.id === userId ||
      meeting.attendees.some(attendee => attendee.id === userId);

    if (!isParticipant) return false;

    if (startDate && endDate) {
      const meetingStart = new Date(meeting.startDate);
      return meetingStart >= startDate && meetingStart <= endDate;
    }

    return true;
  });
};

export const getUpcomingMeetings = (
  userId: string,
  limit: number = 5
): Meeting[] => {
  const now = new Date();
  return meetingsAtom.init
    .filter(meeting => 
      (meeting.organizer.id === userId ||
       meeting.attendees.some(attendee => attendee.id === userId)) &&
      new Date(meeting.startDate) > now
    )
    .sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, limit);
};