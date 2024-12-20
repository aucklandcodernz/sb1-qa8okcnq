
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import PayrollStats from '../../components/payroll/PayrollStats';
import PayrollSummary from '../../components/payroll/PayrollSummary';
import PayrollWorkflow from '../../components/payroll/PayrollWorkflow';

interface PayrollPeriod {
  id: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'PROCESSING' | 'COMPLETED';
}

interface PayrollData {
  stats: {
    totalProcessed: number;
    totalPending: number;
    totalAmount: number;
  };
  summary: {
    currentPeriod: PayrollPeriod;
    totalEmployees: number;
  };
  items: PayrollPeriod[];
}

export default function PayrollDashboard() {
  const { data: payrollData, isLoading, error } = useQuery<PayrollData>({
    queryKey: ['payroll'],
    queryFn: async () => {
      const response = await fetch('/api/payroll/periods');
      if (!response.ok) throw new Error('Failed to fetch payroll data');
      return response.json();
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading payroll data</div>;
  if (!payrollData) return null;

  return (
    <div className="space-y-6">
      <PayrollStats data={payrollData.stats} />
      <PayrollSummary data={payrollData.summary} />
      <PayrollWorkflow items={payrollData.items} />
    </div>
  );
}
