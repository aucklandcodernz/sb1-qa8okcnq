import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';
import PayrollNav from '../components/payroll/PayrollNav';
import PayrollDashboard from './payroll/PayrollDashboard';
import PayProcessing from './payroll/PayProcessing';
import EmployeePay from './payroll/EmployeePay';
import PayrollCalculators from './payroll/PayrollCalculators';
import PayrollReports from './payroll/PayrollReports';
import PayCalendar from './payroll/PayCalendar';
import PayrollSettings from './payroll/PayrollSettings';
import PayrollCompliance from './payroll/PayrollCompliance';

export default function Payroll() {
  const { id: organizationId } = useParams();
  const [user] = useAtom(userAtom);

  if (!organizationId) {
    return <Navigate to="/organizations" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!['ORG_ADMIN', 'SUPER_ADMIN', 'HR_MANAGER'].includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payroll Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Process payroll, manage employee pay, and ensure compliance
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <PayrollNav organizationId={organizationId} />
        
        <div className="p-6">
          <Routes>
            <Route index element={<PayrollDashboard />} />
            <Route path="processing" element={<PayProcessing />} />
            <Route path="employees" element={<EmployeePay />} />
            <Route path="compliance" element={<PayrollCompliance />} />
            <Route path="calculators" element={<PayrollCalculators />} />
            <Route path="reports" element={<PayrollReports />} />
            <Route path="calendar" element={<PayCalendar />} />
            <Route path="settings" element={<PayrollSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}