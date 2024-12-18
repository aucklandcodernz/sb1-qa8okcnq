import React from 'react';
import { useAtom } from 'jotai';
import { DollarSign, TrendingUp, Clock, Users } from 'lucide-react';
import { payrollItemsAtom } from '../../lib/payroll';
import { userAtom } from '../../lib/auth';
import PayrollStats from '../../components/payroll/PayrollStats';
import PayrollSummary from '../../components/payroll/PayrollSummary';
import PayParityChart from '../../components/payroll/PayParityChart';
import MinimumWageAlert from '../../components/payroll/MinimumWageAlert';
import MinimumWageUpdatesCard from '../../components/payroll/MinimumWageUpdatesCard';
import PayrollCalculator from '../../components/payroll/PayrollCalculator';
import KiwiSaverCalculator from '../../components/payroll/KiwiSaverCalculator';

export default function PayrollDashboard() {
  const [user] = useAtom(userAtom);
  const [payrollItems] = useAtom(payrollItemsAtom);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PayrollStats employeeId={user?.id} />
          <PayrollSummary employeeId={user?.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PayrollCalculator />
            <KiwiSaverCalculator />
          </div>
          
          <PayParityChart 
            analysis={{
              id: '1',
              organizationId: '1',
              role: 'Software Engineer',
              department: 'Engineering',
              averageSalary: 85000,
              medianSalary: 82000,
              salaryRange: { min: 70000, max: 120000 },
              distribution: [
                { range: '70k-80k', count: 5, percentage: 20 },
                { range: '80k-90k', count: 10, percentage: 40 },
                { range: '90k-100k', count: 7, percentage: 28 },
                { range: '100k-110k', count: 2, percentage: 8 },
                { range: '110k-120k', count: 1, percentage: 4 },
              ],
              disparityFactors: [
                { factor: 'Experience', impact: 0.15, description: 'Years of experience accounts for 15% of salary variation' },
                { factor: 'Skills', impact: 0.12, description: 'Technical skill set contributes to 12% of salary differences' },
              ],
              recommendations: [
                'Review experience-based pay progression',
                'Implement clear skill-based salary bands',
                'Conduct regular market rate reviews',
              ],
              createdAt: new Date().toISOString(),
            }}
          />
        </div>
        <div className="space-y-6">
          <MinimumWageAlert
            check={{
              isCompliant: false,
              actualRate: 20,
              requiredRate: 22.70,
              shortfall: 2.70,
              effectiveDate: '2024-04-01',
            }}
          />
          <MinimumWageUpdatesCard />
        </div>
      </div>
    </div>
  );
}