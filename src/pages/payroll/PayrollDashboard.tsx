
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import PayrollStats from '../../components/payroll/PayrollStats';
import PayrollSummary from '../../components/payroll/PayrollSummary';
import PayrollWorkflow from '../../components/payroll/PayrollWorkflow';
import type { PayrollData } from '../../types/payroll';

export default function PayrollDashboard() {
  const { data, isLoading, error } = useQuery<PayrollData>({
    queryKey: ['payroll'],
    queryFn: async () => {
      const response = await fetch('/api/payroll/periods', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch payroll data: ${errorText}`);
      }
      
      const responseData = await response.json();
      if (!responseData) {
        throw new Error('No payroll data received');
      }
      return responseData;
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 30000
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error instanceof Error ? error.message : 'Error loading payroll data'} />;
  if (!data) return <ErrorMessage message="No payroll data available" />;

  return (
    <div className="space-y-6">
      <PayrollStats data={data.stats} />
      <PayrollSummary data={data.summary} />
      <PayrollWorkflow items={data.items} />
    </div>
  );
}
