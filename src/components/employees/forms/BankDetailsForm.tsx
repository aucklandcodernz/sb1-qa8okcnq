import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, CreditCard, DollarSign } from 'lucide-react';
import FormField from '../../ui/FormField';

const bankDetailsSchema = z.object({
  accountName: z.string().min(2, 'Account name must be at least 2 characters'),
  accountNumber: z.string().min(1, 'Account number is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  branchCode: z.string().optional(),
  swiftCode: z.string().optional(),
  taxNumber: z.string().optional(),
});

interface BankDetailsFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function BankDetailsForm({ onSubmit, defaultValues }: BankDetailsFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center mb-6">
        <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Bank Details</h3>
      </div>

      <FormField
        label="Account Name"
        {...register('accountName')}
        error={errors.accountName?.message}
        leftIcon={<CreditCard className="h-5 w-5 text-gray-400" />}
      />

      <FormField
        label="Account Number"
        {...register('accountNumber')}
        error={errors.accountNumber?.message}
        leftIcon={<CreditCard className="h-5 w-5 text-gray-400" />}
      />

      <FormField
        label="Bank Name"
        {...register('bankName')}
        error={errors.bankName?.message}
        leftIcon={<Building2 className="h-5 w-5 text-gray-400" />}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Branch Code (Optional)"
          {...register('branchCode')}
          error={errors.branchCode?.message}
        />

        <FormField
          label="SWIFT Code (Optional)"
          {...register('swiftCode')}
          error={errors.swiftCode?.message}
        />
      </div>

      <FormField
        label="Tax Number (Optional)"
        {...register('taxNumber')}
        error={errors.taxNumber?.message}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Bank Details
        </button>
      </div>
    </form>
  );
}