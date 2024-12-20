
import React from 'react';
import { PayrollStats } from '../../components/payroll/PayrollStats';
import { PayrollWorkflow } from '../../components/payroll/PayrollWorkflow';
import { MinimumWageAlert } from '../../components/payroll/MinimumWageAlert';
import { ComplianceMonitor } from '../../components/payroll/ComplianceMonitor';
import { PayrollNav } from '../../components/payroll/PayrollNav';

export default function PayrollDashboard() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Payroll Dashboard</h1>
      <PayrollNav />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PayrollStats />
        <MinimumWageAlert />
      </div>
      <PayrollWorkflow />
      <ComplianceMonitor />
    </div>
  );
}
