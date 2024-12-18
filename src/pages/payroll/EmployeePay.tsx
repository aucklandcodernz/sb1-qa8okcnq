import React from 'react';
import { useAtom } from 'jotai';
import { employeeProfilesAtom } from '../../lib/employees';
import { userAtom } from '../../lib/auth';
import PayrollList from '../../components/payroll/PayrollList';
import PayParityAlert from '../../components/payroll/PayParityAlert';
import MinimumWageAlert from '../../components/payroll/MinimumWageAlert';

export default function EmployeePay() {
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const [user] = useAtom(userAtom);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Employee Pay Management</h3>
      
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
            { factor: 'Experience', impact: 0.15, description: 'Years of experience accounts for 15% of salary variation' },
          ],
          recommendations: ['Review experience-based pay progression'],
          createdAt: new Date().toISOString(),
        }}
      />

      <MinimumWageAlert
        check={{
          isCompliant: false,
          actualRate: 20,
          requiredRate: 22.70,
          shortfall: 2.70,
          effectiveDate: '2024-04-01',
        }}
      />

      <PayrollList items={[]} canManage={true} />
    </div>
  );
}