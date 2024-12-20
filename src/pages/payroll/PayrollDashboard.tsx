
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import PayrollStats from '../../components/payroll/PayrollStats';
import PayrollSummary from '../../components/payroll/PayrollSummary';
import PayrollWorkflow from '../../components/payroll/PayrollWorkflow';
import type { PayrollData } from '../../types/payroll';

export default function PayrollDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['payroll-periods'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/payroll/periods');
        if (!response.ok) {
          throw new Error('Failed to fetch payroll data');
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.error('Payroll fetch error:', err);
        throw err;
      }
    },
    retry: 2,
    staleTime: 30000
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading payroll data" />;
  if (!data) return <ErrorMessage message="No payroll data available" />;

  return (
    <div className="space-y-6">
      <PayrollStats data={data.stats} />
      <PayrollSummary data={data.summary} />
      <PayrollWorkflow items={data.workflow} />
    </div>
  );
}
