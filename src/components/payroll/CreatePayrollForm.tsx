import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { payrollItemsAtom } from '../../lib/payroll';
import { calculatePayroll } from '../../lib/payroll';

const createPayrollSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  periodStart: z.string().min(1, 'Start date is required'),
  periodEnd: z.string().min(1, 'End date is required'),
  paymentMethod: z.enum(['BANK_TRANSFER', 'CHECK', 'CASH']),
  comments: z.string().optional(),
});

interface CreatePayrollFormProps {
  onSuccess: () => void;
}

export default function CreatePayrollForm({ onSuccess }: CreatePayrollFormProps) {
  const [payrollItems, setPayrollItems] = useAtom(payrollItemsAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createPayrollSchema),
  });

  const onSubmit = (data: any) => {
    const payrollItem = calculatePayroll(
      data.employeeId,
      data.periodStart,
      data.periodEnd
    );

    const newPayrollItem = {
      ...payrollItem,
      paymentMethod: data.paymentMethod,
      comments: data.comments,
    };

    setPayrollItems([...payrollItems, newPayrollItem]);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Employee ID
        </label>
        <input
          type="text"
          {...register('employeeId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.employeeId && (
          <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Period Start
          </label>
          <input
            type="date"
            {...register('periodStart')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.periodStart && (
            <p className="mt-1 text-sm text-red-600">{errors.periodStart.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Period End
          </label>
          <input
            type="date"
            {...register('periodEnd')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.periodEnd && (
            <p className="mt-1 text-sm text-red-600">{errors.periodEnd.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          {...register('paymentMethod')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select payment method</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CHECK">Check</option>
          <option value="CASH">Cash</option>
        </select>
        {errors.paymentMethod && (
          <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          {...register('comments')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Process Payroll
        </button>
      </div>
    </form>
  );
}