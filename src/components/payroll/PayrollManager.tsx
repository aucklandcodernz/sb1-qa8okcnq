import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus, Calculator } from 'lucide-react';
import { payrollItemsAtom } from '../../lib/payroll';
import { userAtom } from '../../lib/auth';
import PayrollList from './PayrollList';
import PayslipGenerator from './PayslipGenerator';
import EarningsForm from './EarningsForm';
import DeductionsForm from './DeductionsForm';

export default function PayrollManager() {
  const [showForm, setShowForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [payrollItems] = useAtom(payrollItemsAtom);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Payroll Management</h3>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Calculator className="-ml-1 mr-2 h-5 w-5" />
          Process Payroll
        </button>
      </div>

      {showForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-8">
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Earnings</h4>
              <EarningsForm />
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Deductions</h4>
              <DeductionsForm />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PayrollList items={payrollItems} canManage={true} />
          </div>
          <div>
            <PayslipGenerator />
          </div>
        </div>
      )}
    </div>
  );
}