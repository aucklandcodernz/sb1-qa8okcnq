
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import PayrollStats from '../../components/payroll/PayrollStats';
import PayrollSummary from '../../components/payroll/PayrollSummary';
import PayrollWorkflow from '../../components/payroll/PayrollWorkflow';

export default function PayrollDashboard() {
  const { data: payrollData, isLoading, error } = useQuery({
    queryKey: ['payroll'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/payroll/periods`);
      if (!response.ok) throw new Error('Failed to fetch payroll data');
      return response.json();
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading payroll data</div>;

  return (
    <div className="space-y-6">
      <PayrollStats data={payrollData.stats} />
      <PayrollSummary data={payrollData.summary} />
      <PayrollWorkflow items={payrollData.items} />
    </div>
  );
}
