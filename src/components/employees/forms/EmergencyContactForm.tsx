import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, Mail, Heart } from 'lucide-react';
import FormField from '../../ui/FormField';

const emergencyContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  relationship: z.string().min(1, 'Relationship is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address').optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

interface EmergencyContactFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function EmergencyContactForm({ onSubmit, defaultValues }: EmergencyContactFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center mb-6">
        <Heart className="h-5 w-5 text-red-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
      </div>

      <FormField
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
        leftIcon={<User className="h-5 w-5 text-gray-400" />}
      />

      <FormField
        label="Relationship"
        {...register('relationship')}
        error={errors.relationship?.message}
        leftIcon={<Heart className="h-5 w-5 text-gray-400" />}
      />

      <FormField
        label="Phone Number"
        type="tel"
        {...register('phoneNumber')}
        error={errors.phoneNumber?.message}
        leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
      />

      <FormField
        label="Email (Optional)"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
      />

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Address (Optional)</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Street"
            {...register('address.street')}
            error={errors.address?.street?.message}
          />

          <FormField
            label="City"
            {...register('address.city')}
            error={errors.address?.city?.message}
          />

          <FormField
            label="Postal Code"
            {...register('address.postalCode')}
            error={errors.address?.postalCode?.message}
          />

          <FormField
            label="Country"
            {...register('address.country')}
            error={errors.address?.country?.message}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Contact
        </button>
      </div>
    </form>
  );
}