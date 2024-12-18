import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { DollarSign, Calendar, Users, ArrowRight } from 'lucide-react';
import { employeeProfilesAtom } from '../../lib/employees';
import { calculatePayrollItem } from '../../lib/payroll/calculations';
import { payrollItemsAtom } from '../../lib/payroll';
import { cn } from '../../lib/utils';

type WizardStep = 'SELECT_PERIOD' | 'SELECT_EMPLOYEES' | 'REVIEW' | 'CONFIRM';

interface PayrollDetails {
  employeeId: string;
  salary: number;
  taxCode: string;
  kiwiSaverRate: number;
  hasStudentLoan: boolean;
}

export default function PayrollRunWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('SELECT_PERIOD');
  const [selectedEmployees, setSelectedEmployees] = useState<PayrollDetails[]>([]);
  const [payPeriod, setPayPeriod] = useState({
    start: format(new Date(), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd'),
  });
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const [, setPayrollItems] = useAtom(payrollItemsAtom);

  const steps = [
    { id: 'SELECT_PERIOD', name: 'Select Pay Period' },
    { id: 'SELECT_EMPLOYEES', name: 'Select Employees' },
    { id: 'REVIEW', name: 'Review Details' },
    { id: 'CONFIRM', name: 'Confirm & Process' },
  ];

  const handleNext = async () => {
    if (currentStep === 'CONFIRM') {
      // Process payroll for all selected employees
      const newPayrollItems = selectedEmployees.map(employee => 
        calculatePayrollItem(
          employee.employeeId,
          payPeriod.start,
          payPeriod.end,
          employee.salary,
          employee.taxCode as any,
          [], // Allowances
          [], // Deductions
          { hours: 0, rate: 0, amount: 0 }, // Overtime
          employee.kiwiSaverRate
        )
      );

      setPayrollItems(prev => [...prev, ...newPayrollItems]);
      return;
    }

    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as WizardStep);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'SELECT_PERIOD':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={payPeriod.start}
                  onChange={(e) => setPayPeriod(prev => ({ ...prev, start: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={payPeriod.end}
                  onChange={(e) => setPayPeriod(prev => ({ ...prev, end: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        );

      case 'SELECT_EMPLOYEES':
        return (
          <div className="space-y-4">
            {Object.values(employeeProfiles).map((employee) => (
              <div key={employee.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.some(e => e.employeeId === employee.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEmployees(prev => [...prev, {
                          employeeId: employee.id,
                          salary: employee.salary.amount,
                          taxCode: 'M',
                          kiwiSaverRate: 0.03,
                          hasStudentLoan: false,
                        }]);
                      } else {
                        setSelectedEmployees(prev => 
                          prev.filter(e => e.employeeId !== employee.id)
                        );
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 block text-sm text-gray-700">
                    {employee.firstName} {employee.lastName} - {employee.position}
                  </label>
                </div>

                {selectedEmployees.some(e => e.employeeId === employee.id) && (
                  <div className="ml-7 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tax Code
                      </label>
                      <select
                        value={selectedEmployees.find(e => e.employeeId === employee.id)?.taxCode}
                        onChange={(e) => {
                          setSelectedEmployees(prev => prev.map(emp => 
                            emp.employeeId === employee.id
                              ? { ...emp, taxCode: e.target.value }
                              : emp
                          ));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="M">M (Primary Employment)</option>
                        <option value="ME">ME (Primary with Student Loan Exemption)</option>
                        <option value="SB">SB (Secondary Employment)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        KiwiSaver Rate
                      </label>
                      <select
                        value={selectedEmployees.find(e => e.employeeId === employee.id)?.kiwiSaverRate}
                        onChange={(e) => {
                          setSelectedEmployees(prev => prev.map(emp => 
                            emp.employeeId === employee.id
                              ? { ...emp, kiwiSaverRate: Number(e.target.value) }
                              : emp
                          ));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="0.03">3%</option>
                        <option value="0.04">4%</option>
                        <option value="0.06">6%</option>
                        <option value="0.08">8%</option>
                        <option value="0.10">10%</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'REVIEW':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Pay Period</h4>
              <p className="text-sm text-gray-500">
                {format(new Date(payPeriod.start), 'MMMM d, yyyy')} - {format(new Date(payPeriod.end), 'MMMM d, yyyy')}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Employees</h4>
              <ul className="space-y-2">
                {selectedEmployees.map(employee => {
                  const profile = employeeProfiles[employee.employeeId];
                  return (
                    <li key={employee.employeeId} className="text-sm text-gray-500">
                      {profile.firstName} {profile.lastName} - Tax Code: {employee.taxCode}, KiwiSaver: {employee.kiwiSaverRate * 100}%
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );

      case 'CONFIRM':
        return (
          <div className="text-center">
            <DollarSign className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Ready to Process</h3>
            <p className="mt-1 text-sm text-gray-500">
              This will process payroll for {selectedEmployees.length} employees
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li
                  key={step.id}
                  className={cn(
                    stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
                    'relative'
                  )}
                >
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div
                    className={cn(
                      'relative flex h-8 w-8 items-center justify-center rounded-full',
                      step.id === currentStep
                        ? 'bg-indigo-600'
                        : steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id)
                        ? 'bg-indigo-600'
                        : 'bg-gray-200'
                    )}
                  >
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full',
                        step.id === currentStep
                          ? 'bg-white'
                          : steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id)
                          ? 'bg-white'
                          : 'bg-gray-400'
                      )}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mt-8 space-y-6">
          {renderStepContent()}

          <div className="flex justify-end space-x-3">
            {currentStep !== 'SELECT_PERIOD' && (
              <button
                type="button"
                onClick={() => {
                  const currentIndex = steps.findIndex(step => step.id === currentStep);
                  setCurrentStep(steps[currentIndex - 1].id as WizardStep);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentStep === 'CONFIRM' ? 'Process Payroll' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}