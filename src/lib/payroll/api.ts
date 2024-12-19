
import { PayrollPeriod, Payslip } from '@prisma/client';

export async function createPayrollPeriod(data: {
  startDate: string;
  endDate: string;
  organizationId: string;
}): Promise<{ payrollPeriod: PayrollPeriod; payslips: Payslip[] }> {
  const response = await fetch('/api/payroll/periods/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create payroll period');
  }

  return response.json();
}

export async function processPayrollPeriod(id: string): Promise<PayrollPeriod> {
  const response = await fetch(`/api/payroll/periods/${id}/process`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to process payroll period');
  }

  return response.json();
}
