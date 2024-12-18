import React from 'react';
import { useAtom } from 'jotai';
import { payrollItemsAtom } from '../../lib/payroll';
import PayrollList from '../../components/payroll/PayrollList';
import PayrollSummary from '../../components/payroll/PayrollSummary';
import PayslipGenerator from '../../components/payroll/PayslipGenerator';
import PayrollStats from '../../components/payroll/PayrollStats';

interface EmployeePayrollProps {
  employeeId: string;
}

export default function EmployeePayroll({ employeeId }: EmployeePayrollProps) {
  const [payrollItems] = useAtom(payrollItemsAtom);
  const employeePayroll = payrollItems.filter(
    item => item.employeeId === employeeId
  );

  return (
    <div className="space-y-6">
      <PayrollStats employeeId={employeeId} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PayrollList items={employeePayroll} canManage={false} />
        </div>
        <div className="space-y-6">
          <PayrollSummary employeeId={employeeId} />
          <PayslipGenerator />
        </div>
      </div>
    </div>
  );
}