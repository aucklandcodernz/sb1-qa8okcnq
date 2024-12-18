import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, Mail, User, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import FormField from '../components/ui/FormField';
import PlanSelector from '../components/subscription/PlanSelector';

const registerSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  adminEmail: z.string().email('Invalid email address'),
  adminFirstName: z.string().min(2, 'First name must be at least 2 characters'),
  adminLastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  plan: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterOrganization() {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerOrganization } = useAuth();
  const [step, setStep] = useState<'plan' | 'details'>('plan');
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      plan: location.state?.plan,
    },
  });

  const selectedPlan = watch('plan');

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerOrganization(data);
      navigate('/login', { 
        state: { message: 'Registration successful! Please check your email to verify your account.' }
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handlePlanSelect = (planId: string) => {
    setValue('plan', planId);
    setStep('details');
  };

  if (step === 'plan') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Choose your plan
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select the plan that best fits your organization
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl">
          <PlanSelector
            selectedPlan={selectedPlan}
            onSelectPlan={handlePlanSelect}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Register your organization
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create an account to start managing your HR needs
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Organization Name"
              {...register('organizationName')}
              error={errors.organizationName?.message}
              leftIcon={<Building2 className="h-5 w-5 text-gray-400" />}
            />

            <FormField
              label="Admin Email"
              type="email"
              {...register('adminEmail')}
              error={errors.adminEmail?.message}
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First Name"
                {...register('adminFirstName')}
                error={errors.adminFirstName?.message}
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
              />

              <FormField
                label="Last Name"
                {...register('adminLastName')}
                error={errors.adminLastName?.message}
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
              />
            </div>

            <FormField
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            />

            <FormField
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('plan')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {selectedPlan ? `Change plan (${selectedPlan})` : 'Select a plan'}
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={!selectedPlan}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Register Organization
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}