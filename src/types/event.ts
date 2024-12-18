
export type EventType = 'MEETING' | 'REVIEW' | 'DEADLINE' | 'OTHER';

export interface Event {
  id: string;
  title: string;
  startTime: string;
  type: EventType;
}
