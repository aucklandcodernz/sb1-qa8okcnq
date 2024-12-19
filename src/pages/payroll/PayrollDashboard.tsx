
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Card } from '../../components/ui/Card';
import PayrollStats from '../../components/payroll/PayrollStats';
import PayrollSummary from '../../components/payroll/PayrollSummary';
import PayrollList from '../../components/payroll/PayrollList';

export default function PayrollDashboard() {
  const { data: payrollData, isLoading, error } = useQuery({
    queryKey: ['payroll'],
    queryFn: async () => {
      const response = await fetch('/api/payroll/periods');
      if (!response.ok) throw new Error('Failed to fetch payroll data');
      return response.json();
    }
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) return <div className="text-red-500">Error loading payroll data</div>;

  return (
    <div className="space-y-6">
      <PayrollStats data={payrollData?.stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <PayrollSummary data={payrollData?.summary} />
        </Card>
        <Card>
          <PayrollList payrolls={payrollData?.items} />
        </Card>
      </div>
    </div>
  );
}
