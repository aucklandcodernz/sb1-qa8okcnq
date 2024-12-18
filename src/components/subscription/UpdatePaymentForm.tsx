import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard } from 'lucide-react';
import FormField from '../ui/FormField';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Invalid card number'),
  expiryMonth: z.string().min(1, 'Required'),
  expiryYear: z.string().min(1, 'Required'),
  cvv: z.string().min(3, 'Invalid CVV'),
  name: z.string().min(1, 'Cardholder name is required'),
});

interface UpdatePaymentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function UpdatePaymentForm({ onSubmit, onCancel }: UpdatePaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Update Payment Method</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>

      <FormField
        label="Card Number"
        {...register('cardNumber')}
        error={errors.cardNumber?.message}
        leftIcon={<CreditCard className="h-5 w-5 text-gray-400" />}
      />

      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="Expiry Month"
          {...register('expiryMonth')}
          error={errors.expiryMonth?.message}
        />
        <FormField
          label="Expiry Year"
          {...register('expiryYear')}
          error={errors.expiryYear?.message}
        />
        <FormField
          label="CVV"
          type="password"
          {...register('cvv')}
          error={errors.cvv?.message}
        />
      </div>

      <FormField
        label="Cardholder Name"
        {...register('name')}
        error={errors.name?.message}
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Update Payment Method
        </button>
      </div>
    </form>
  );
}