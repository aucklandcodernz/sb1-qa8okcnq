import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, Users, Clock, Calendar, FileText, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

const plans = [
  {
    name: 'Starter',
    price: 60,
    description: 'Perfect for small businesses',
    features: [
      'Up to 10 employees',
      'Time & attendance tracking',
      'Leave management',
      'Basic reporting',
      'Mobile app access',
      'Employee self-service portal',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: 120,
    description: 'Best for growing teams',
    features: [
      'Up to 50 employees',
      'All Starter features',
      'Performance management',
      'Training & development',
      'Advanced reporting',
      'Document management',
      'Health & safety tools',
      'Compliance management',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 240,
    description: 'For large organizations',
    features: [
      'Unlimited employees',
      'All Professional features',
      'Custom integrations',
      'Dedicated account manager',
      'API access',
      'Advanced analytics',
      'Custom branding',
      'SSO & advanced security',
      '24/7 premium support',
    ],
  },
];

const features = [
  {
    icon: Shield,
    title: 'Health & Safety',
    description: 'Complete H&S software with risk assessment tools and training resources',
  },
  {
    icon: Calendar,
    title: 'Leave Management',
    description: 'Track and manage all types of leave with automated calculations',
  },
  {
    icon: Clock,
    title: 'Time & Attendance',
    description: 'Advanced time tracking with scheduling and overtime management',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Secure storage and sharing of HR documents and policies',
  },
  {
    icon: Users,
    title: 'Employee Management',
    description: 'Comprehensive employee data management and self-service',
  },
  {
    icon: BookOpen,
    title: 'Training & Development',
    description: 'Track employee training, certifications, and development plans',
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for your business
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Simple, transparent pricing that grows with your business. All plans include a 14-day free trial.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10',
                plan.popular && 'bg-gray-50 ring-2 ring-indigo-600'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{plan.name}</h3>
                {plan.popular && (
                  <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/user/month</span>
              </p>
              <button
                onClick={() => navigate('/register')}
                className={cn(
                  'mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    : 'bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'
                )}
              >
                Start free trial
              </button>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-indigo-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Everything you need to manage your workforce
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                      <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}