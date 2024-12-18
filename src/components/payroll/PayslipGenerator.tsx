import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { FileText, Download, Calculator } from 'lucide-react';
import { payrollItemsAtom } from '../../lib/payroll';
import { userAtom } from '../../lib/auth';
import { calculatePayrollItem } from '../../lib/payroll/calculations';
import { cn } from '../../lib/utils';

export default function PayslipGenerator() {
  const [user] = useAtom(userAtom);
  const [payrollItems, setPayrollItems] = useAtom(payrollItemsAtom);
  const [loading, setLoading] = useState(false);

  const handleGeneratePayslip = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const payrollItem = calculatePayrollItem(
        user.id,
        '2024-03-01',
        '2024-03-31',
        75000, // Annual salary
        'M', // Tax code
        [], // Allowances
        [], // Deductions
        { hours: 0, rate: 0, amount: 0 }, // Overtime
        0.03 // KiwiSaver rate
      );

      setPayrollItems(prev => [...prev, payrollItem]);
    } catch (error) {
      console.error('Error generating payslip:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-400" />
            Generate Payslip
          </h3>
          <button
            onClick={handleGeneratePayslip}
            disabled={loading}
            className={cn(
              "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              loading 
                ? "bg-gray-300 cursor-not-allowed" 
                : "text-white bg-indigo-600 hover:bg-indigo-700"
            )}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Generate Payslip
          </button>
        </div>

        <div className="space-y-4">
          {payrollItems.map((item) => (
            <div 
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Payslip for {item.periodStart} to {item.periodEnd}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Net Pay: ${item.netSalary.toFixed(2)}
                </p>
              </div>
              <button
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          ))}
          {payrollItems.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No payslips generated yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}