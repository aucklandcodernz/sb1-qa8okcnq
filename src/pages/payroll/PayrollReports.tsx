import React from 'react';
import PayrollReportGenerator from '../../components/payroll/PayrollReportGenerator';
import PayrollReportList from '../../components/payroll/PayrollReportList';

export default function PayrollReports() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Payroll Reports & Filing</h3>
        <p className="mt-1 text-sm text-gray-500">
          Generate and manage payroll reports for your organization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PayrollReportGenerator />
        </div>
        <div>
          <PayrollReportList />
        </div>
      </div>
    </div>
  );
}