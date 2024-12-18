import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import FormField from '../../ui/FormField';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']),
});

interface PersonalInfoFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function PersonalInfoForm({ onSubmit, defaultValues }: PersonalInfoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
          leftIcon={<User className="h-5 w-5 text-gray-400" />}
        />

        <FormField
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
          leftIcon={<User className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <FormField
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
      />

      <FormField
        label="Phone Number"
        type="tel"
        {...register('phoneNumber')}
        error={errors.phoneNumber?.message}
        leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
      />

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Address</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Street"
            {...register('address.street')}
            error={errors.address?.street?.message}
            leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Date of Birth"
          type="date"
          {...register('dateOfBirth')}
          error={errors.dateOfBirth?.message}
        />

        <FormField
          label="Nationality"
          {...register('nationality')}
          error={errors.nationality?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          {...register('gender')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
          <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}