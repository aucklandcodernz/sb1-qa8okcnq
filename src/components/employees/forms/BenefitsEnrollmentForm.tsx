import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Shield, Users, Calendar } from 'lucide-react';
import FormField from '../../ui/FormField';
import FormSelect from '../../ui/FormSelect';

const benefitsSchema = z.object({
  healthInsurance: z.object({
    enrolled: z.boolean(),
    plan: z.string().optional(),
    coverageType: z.enum(['INDIVIDUAL', 'FAMILY']).optional(),
    dependents: z.array(z.object({
      name: z.string(),
      relationship: z.string(),
      dateOfBirth: z.string(),
    })).optional(),
  }),
  lifeInsurance: z.object({
    enrolled: z.boolean(),
    coverageAmount: z.number().optional(),
    beneficiaries: z.array(z.object({
      name: z.string(),
      relationship: z.string(),
      percentage: z.number(),
    })).optional(),
  }),
  retirement: z.object({
    enrolled: z.boolean(),
    contributionPercentage: z.number().optional(),
    investmentStrategy: z.string().optional(),
  }),
  additionalBenefits: z.array(z.object({
    type: z.string(),
    enrolled: z.boolean(),
    details: z.string().optional(),
  })).optional(),
});

interface BenefitsEnrollmentFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  availablePlans?: {
    health: Array<{ id: string; name: string }>;
    life: Array<{ id: string; name: string }>;
    retirement: Array<{ id: string; name: string }>;
  };
}

export default function BenefitsEnrollmentForm({
  onSubmit,
  defaultValues,
  availablePlans,
}: BenefitsEnrollmentFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(benefitsSchema),
    defaultValues,
  });

  const healthInsuranceEnrolled = watch('healthInsurance.enrolled');
  const lifeInsuranceEnrolled = watch('lifeInsurance.enrolled');
  const retirementEnrolled = watch('retirement.enrolled');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center mb-6">
        <Heart className="h-5 w-5 text-red-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Benefits Enrollment</h3>
      </div>

      {/* Health Insurance Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Shield className="h-4 w-4 mr-2 text-blue-500" />
          Health Insurance
        </h4>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('healthInsurance.enrolled')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Enroll in Health Insurance
          </label>
        </div>

        {healthInsuranceEnrolled && (
          <div className="space-y-4 ml-6">
            <FormSelect
              label="Plan"
              {...register('healthInsurance.plan')}
              error={errors.healthInsurance?.plan?.message}
              options={availablePlans?.health.map(plan => ({
                value: plan.id,
                label: plan.name,
              })) || []}
            />

            <FormSelect
              label="Coverage Type"
              {...register('healthInsurance.coverageType')}
              error={errors.healthInsurance?.coverageType?.message}
              options={[
                { value: 'INDIVIDUAL', label: 'Individual' },
                { value: 'FAMILY', label: 'Family' },
              ]}
            />
          </div>
        )}
      </div>

      {/* Life Insurance Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Shield className="h-4 w-4 mr-2 text-green-500" />
          Life Insurance
        </h4>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('lifeInsurance.enrolled')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Enroll in Life Insurance
          </label>
        </div>

        {lifeInsuranceEnrolled && (
          <div className="space-y-4 ml-6">
            <FormField
              label="Coverage Amount"
              type="number"
              {...register('lifeInsurance.coverageAmount', { valueAsNumber: true })}
              error={errors.lifeInsurance?.coverageAmount?.message}
              leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
            />
          </div>
        )}
      </div>

      {/* Retirement Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-purple-500" />
          Retirement Plan
        </h4>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('retirement.enrolled')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Enroll in Retirement Plan
          </label>
        </div>

        {retirementEnrolled && (
          <div className="space-y-4 ml-6">
            <FormField
              label="Contribution Percentage"
              type="number"
              step="0.1"
              {...register('retirement.contributionPercentage', { valueAsNumber: true })}
              error={errors.retirement?.contributionPercentage?.message}
              leftIcon={<Percent className="h-5 w-5 text-gray-400" />}
            />

            <FormSelect
              label="Investment Strategy"
              {...register('retirement.investmentStrategy')}
              error={errors.retirement?.investmentStrategy?.message}
              options={availablePlans?.retirement.map(plan => ({
                value: plan.id,
                label: plan.name,
              })) || []}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Benefits Selection
        </button>
      </div>
    </form>
  );
}