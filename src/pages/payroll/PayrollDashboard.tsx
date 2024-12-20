
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import PayrollStats from '../../components/payroll/PayrollStats';
import PayrollWorkflow from '../../components/payroll/PayrollWorkflow';
import ComplianceMonitor from '../../components/payroll/ComplianceMonitor';

export default function PayrollDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['payroll-dashboard'],
    queryFn: async () => {
      const response = await fetch('/api/payroll/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch payroll data');
      }
      return response.json();
    },
    staleTime: 60000,
    cacheTime: 300000,
    retry: 2
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading payroll data" />;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold mb-6">Payroll Dashboard</h1>
      <PayrollStats data={data?.stats} />
      <ComplianceMonitor items={data?.compliance} />
      <PayrollWorkflow items={data?.workflow} />
    </div>
  );
}
