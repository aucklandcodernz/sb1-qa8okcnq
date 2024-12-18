import React from 'react';
import { Shield, DollarSign, Users, Calendar } from 'lucide-react';
import { BenefitPlan } from '../../../lib/employee/benefits';
import { cn } from '../../../lib/utils';

interface BenefitPlanCardProps {
  plan: BenefitPlan;
  isEnrolled?: boolean;
  onSelect?: () => void;
  className?: string;
}

export default function BenefitPlanCard({
  plan,
  isEnrolled,
  onSelect,
  className,
}: BenefitPlanCardProps) {
  return (
    <div className={cn(
      'bg-white shadow-sm rounded-lg border-2 transition-colors',
      isEnrolled ? 'border-green-500' : 'border-transparent hover:border-indigo-500',
      className
    )}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
          </div>
          {isEnrolled && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Enrolled
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Employee Cost
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              ${plan.cost.employee.toFixed(2)} / month
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Employer Contribution
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              ${plan.cost.employer.toFixed(2)} / month
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Coverage Types
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              Individual, Family
            </dd>
          </div>

          {plan.enrollmentPeriod && (
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Enrollment Period
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(plan.enrollmentPeriod.start).toLocaleDateString()} - {' '}
                {new Date(plan.enrollmentPeriod.end).toLocaleDateString()}
              </dd>
            </div>
          )}
        </dl>

        {onSelect && !isEnrolled && (
          <div className="mt-6">
            <button
              onClick={onSelect}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Select Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}