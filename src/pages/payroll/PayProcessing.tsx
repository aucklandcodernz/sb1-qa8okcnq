import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PayrollRunWizard from '../../components/payroll/PayrollRunWizard';
import PayrollList from '../../components/payroll/PayrollList';
import PayrollFilters from '../../components/payroll/PayrollFilters';
import { useAtom } from 'jotai';
import { payrollItemsAtom } from '../../lib/payroll';

export default function PayProcessing() {
  const [showWizard, setShowWizard] = useState(false);
  const [payrollItems] = useAtom(payrollItemsAtom);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Pay Processing</h3>
          <p className="mt-1 text-sm text-gray-500">
            Process payroll and manage payments
          </p>
        </div>
        <button
          onClick={() => setShowWizard(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Pay Run
        </button>
      </div>

      {showWizard ? (
        <PayrollRunWizard />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PayrollFilters onFilter={() => {}} />
          </div>
          <div className="lg:col-span-3">
            <PayrollList items={payrollItems} canManage={true} />
          </div>
        </div>
      )}
    </div>
  );
}