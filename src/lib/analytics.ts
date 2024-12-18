import { atom } from 'jotai';
import { DashboardMetrics, DepartmentMetrics, EmployeeMetrics } from '../types/analytics';

export const dashboardMetricsAtom = atom<DashboardMetrics>({
  employeeCount: {
    value: 248,
    previousValue: 240,
    change: 3.33,
    trend: 'UP',
    period: 'MONTHLY'
  },
  departmentCount: {
    value: 12,
    previousValue: 12,
    change: 0,
    trend: 'STABLE',
    period: 'MONTHLY'
  },
  activeLeaveRequests: {
    value: 15,
    previousValue: 12,
    change: 25,
    trend: 'UP',
    period: 'WEEKLY'
  },
  attendanceRate: {
    value: 97.5,
    previousValue: 96.8,
    change: 0.7,
    trend: 'UP',
    period: 'MONTHLY'
  },
  averagePerformanceScore: {
    value: 4.2,
    previousValue: 4.1,
    change: 2.44,
    trend: 'UP',
    period: 'QUARTERLY'
  },
  trainingCompletionRate: {
    value: 85,
    previousValue: 82,
    change: 3.66,
    trend: 'UP',
    period: 'MONTHLY'
  },
  openPositions: {
    value: 8,
    previousValue: 5,
    change: 60,
    trend: 'UP',
    period: 'MONTHLY'
  },
  turnoverRate: {
    value: 2.1,
    previousValue: 2.3,
    change: -8.7,
    trend: 'DOWN',
    period: 'MONTHLY'
  }
});

export const departmentMetricsAtom = atom<DepartmentMetrics[]>([
  {
    id: 'd1',
    name: 'Engineering',
    headcount: 45,
    budget: 450000,
    expenses: 425000,
    performanceScore: 4.3,
    attendanceRate: 98.2,
    leaveUtilization: 75.5
  },
  {
    id: 'd2',
    name: 'Sales',
    headcount: 32,
    budget: 320000,
    expenses: 305000,
    performanceScore: 4.1,
    attendanceRate: 96.8,
    leaveUtilization: 82.3
  }
]);

export const employeeMetricsAtom = atom<EmployeeMetrics[]>([
  {
    id: 'emp1',
    name: 'John Smith',
    role: 'DEPT_MANAGER',
    department: 'Engineering',
    performanceScore: 4.5,
    attendanceRate: 98.5,
    leaveBalance: 12,
    trainingProgress: 85,
    lastReviewDate: '2024-01-15'
  }
]);

export const calculateMetricTrend = (current: number, previous: number): 'UP' | 'DOWN' | 'STABLE' => {
  const change = ((current - previous) / previous) * 100;
  if (Math.abs(change) < 1) return 'STABLE';
  return change > 0 ? 'UP' : 'DOWN';
};

export const formatMetricValue = (value: number, type: string): string => {
  switch (type) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'number':
      return value.toLocaleString();
    default:
      return value.toString();
  }
};