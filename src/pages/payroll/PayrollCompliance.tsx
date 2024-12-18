import React from 'react';
import ComplianceMonitor from '../../components/payroll/ComplianceMonitor';
import MinimumWageAlert from '../../components/payroll/MinimumWageAlert';
import PayParityAlert from '../../components/payroll/PayParityAlert';
import PublicHolidayAlert from '../../components/payroll/PublicHolidayAlert';

export default function PayrollCompliance() {
  // Mock compliance items - in a real app these would come from your state management
  const complianceItems = [
    {
      id: '1',
      type: 'TAX' as const,
      status: 'WARNING' as const,
      description: 'Monthly PAYE filing due in 5 days',
      dueDate: '2024-03-20',
      action: 'File Now'
    },
    {
      id: '2',
      type: 'KIWISAVER' as const,
      status: 'COMPLIANT' as const,
      description: 'All KiwiSaver contributions are up to date',
    },
    {
      id: '3',
      type: 'MINIMUM_WAGE' as const,
      status: 'NON_COMPLIANT' as const,
      description: '2 employees below new minimum wage rate effective April 1st',
      action: 'Review Affected Employees'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Payroll Compliance</h3>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and maintain payroll compliance requirements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ComplianceMonitor items={complianceItems} />
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
          <PayParityAlert
            analysis={{
              id: '1',
              organizationId: '1',
              role: 'Software Engineer',
              department: 'Engineering',
              averageSalary: 85000,
              medianSalary: 82000,
              salaryRange: { min: 70000, max: 120000 },
              distribution: [],
              disparityFactors: [
                { factor: 'Experience', impact: 0.15, description: 'Years of experience accounts for 15% of salary variation' }
              ],
              recommendations: ['Review experience-based pay progression'],
              createdAt: new Date().toISOString(),
            }}
          />
          <PublicHolidayAlert
            missedHolidays={[]}
            unpaidHolidays={[]}
          />
        </div>
      </div>
    </div>
  );
}