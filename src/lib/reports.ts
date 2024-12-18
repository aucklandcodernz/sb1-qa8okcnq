import { atom } from 'jotai';
import { Report, ReportData } from '../types/reports';

export const reportsAtom = atom<Report[]>([
  {
    id: 'emp-demographics',
    type: 'EMPLOYEE_DEMOGRAPHICS',
    title: 'Employee Demographics',
    description: 'Overview of employee distribution by department, role, age, and gender',
    period: 'MONTHLY',
    format: ['PDF', 'EXCEL'],
    accessRoles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'],
  },
  {
    id: 'attendance-summary',
    type: 'ATTENDANCE_SUMMARY',
    title: 'Attendance Summary',
    description: 'Analysis of employee attendance patterns and trends',
    period: 'MONTHLY',
    format: ['PDF', 'EXCEL', 'CSV'],
    accessRoles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'],
  },
  {
    id: 'leave-analysis',
    type: 'LEAVE_ANALYSIS',
    title: 'Leave Analysis',
    description: 'Detailed analysis of leave patterns and balances',
    period: 'MONTHLY',
    format: ['PDF', 'EXCEL'],
    accessRoles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'],
  },
  {
    id: 'performance-metrics',
    type: 'PERFORMANCE_METRICS',
    title: 'Performance Metrics',
    description: 'Overview of employee performance ratings and trends',
    period: 'QUARTERLY',
    format: ['PDF', 'EXCEL'],
    accessRoles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'],
  },
  {
    id: 'recruitment-funnel',
    type: 'RECRUITMENT_FUNNEL',
    title: 'Recruitment Funnel',
    description: 'Analysis of recruitment pipeline and hiring metrics',
    period: 'MONTHLY',
    format: ['PDF', 'EXCEL'],
    accessRoles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'],
  },
]);

export const reportDataAtom = atom<Record<string, ReportData>>({});

export const generateReport = async (
  reportId: string,
  parameters: Record<string, any>
): Promise<ReportData> => {
  // In a real implementation, this would make an API call
  // For now, we'll return mock data
  const report = reportsAtom.init.find(r => r.id === reportId);
  if (!report) throw new Error('Report not found');

  const mockData: ReportData = {
    id: Math.random().toString(36).substr(2, 9),
    type: report.type,
    generatedAt: new Date().toISOString(),
    parameters,
    data: {
      // Mock data structure would go here
      // This would be replaced with real data in production
    },
  };

  reportDataAtom.init = {
    ...reportDataAtom.init,
    [mockData.id]: mockData,
  };

  return mockData;
};