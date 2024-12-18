export type NotificationType = 
  | 'STATUS_CHANGE' 
  | 'LEAVE_REQUEST' 
  | 'PERFORMANCE_REVIEW' 
  | 'PAYROLL' 
  | 'ANNOUNCEMENT' 
  | 'TASK'
  | 'APPLICATION_UPDATE'
  | 'INTERVIEW_SCHEDULED'
  | 'ONBOARDING_UPDATE'
  | 'TIMESHEET'
  | 'MESSAGE';

export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type NotificationChannel = 'EMAIL' | 'IN_APP' | 'SMS';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  recipientId: string;
  read: boolean;
  createdAt: string;
  channels: NotificationChannel[];
  action?: {
    type: string;
    url: string;
  };
}

export interface NotificationPreference {
  userId: string;
  channels: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
  preferences: {
    [K in NotificationType]: {
      enabled: boolean;
      channels: NotificationChannel[];
    };
  };
}