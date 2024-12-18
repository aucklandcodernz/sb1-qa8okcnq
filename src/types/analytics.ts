import { Role } from './auth';

export type MetricPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
export type TrendDirection = 'UP' | 'DOWN' | 'STABLE';

export interface MetricValue {
  value: number;
  previousValue: number;
  change: number;
  trend: TrendDirection;
  period: MetricPeriod;
}

export interface DashboardMetrics {
  employeeCount: MetricValue;
  departmentCount: MetricValue;
  activeLeaveRequests: MetricValue;
  attendanceRate: MetricValue;
  averagePerformanceScore: MetricValue;
  trainingCompletionRate: MetricValue;
  openPositions: MetricValue;
  turnoverRate: MetricValue;
}

export interface DepartmentMetrics {
  id: string;
  name: string;
  headcount: number;
  budget: number;
  expenses: number;
  performanceScore: number;
  attendanceRate: number;
  leaveUtilization: number;
}

export interface EmployeeMetrics {
  id: string;
  name: string;
  role: Role;
  department: string;
  performanceScore: number;
  attendanceRate: number;
  leaveBalance: number;
  trainingProgress: number;
  lastReviewDate: string;
}