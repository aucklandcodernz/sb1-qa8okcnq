```typescript
import React from 'react';
import { useAtom } from 'jotai';
import { payrollItemsAtom } from '../../lib/payroll';
import { userAtom } from '../../lib/auth';
import PayrollList from './PayrollList';
import PayrollSummary from './PayrollSummary';
import PayslipViewer from './PayslipViewer';
import PayrollStats from './PayrollStats';

interface PayrollSectionProps {
  employeeId: string;
}

export default function PayrollSection({ employeeId }: PayrollSectionProps) {
  const [user] = useAtom(userAtom);
  const [payrollItems] = useAtom(payrollItemsAtom);

  const employeePayroll = payrollItems.filter(
    item => item.employeeId === employeeId
  );

  const canViewPayroll = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '') || 
                        user?.id === employeeId;

  if (!canViewPayroll) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You don't have permission to view payroll information</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Payroll & Compensation</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PayrollList items={employeePayroll} canManage={false} />
          <PayslipViewer employeeId={employeeId} />
        </div>
        <div className="space-y-6">
          <PayrollSummary employeeId={employeeId} />
          <PayrollStats employeeId={employeeId} />
        </div>
      </div>
    </div>
  );
}
```