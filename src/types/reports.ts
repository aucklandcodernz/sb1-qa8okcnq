export type ReportType = 
  | 'EMPLOYEE_DEMOGRAPHICS'
  | 'ATTENDANCE_SUMMARY'
  | 'LEAVE_ANALYSIS'
  | 'PERFORMANCE_METRICS'
  | 'RECRUITMENT_FUNNEL'
  | 'TRAINING_COMPLETION'
  | 'PAYROLL_SUMMARY'
  | 'TURNOVER_ANALYSIS';

export type ReportPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
export type ReportFormat = 'PDF' | 'EXCEL' | 'CSV';

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  lastGenerated?: string;
  period: ReportPeriod;
  format: ReportFormat[];
  accessRoles: string[];
  parameters?: {
    name: string;
    type: 'date' | 'select' | 'multiselect' | 'text';
    options?: string[];
    required: boolean;
  }[];
}

export interface ReportData {
  id: string;
  type: ReportType;
  generatedAt: string;
  parameters: Record<string, any>;
  data: any;
}