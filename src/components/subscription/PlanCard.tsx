import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PlanCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  onSelect: () => void;
}

export default function PlanCard({
  name,
  price,
  description,
  features,
  popular,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10',
        popular && 'bg-gray-50 ring-2 ring-indigo-600'
      )}
    >
      <div className="flex items-center justify-between gap-x-4">
        <h3 className="text-lg font-semibold leading-8 text-gray-900">{name}</h3>
        {popular && (
          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
            Most popular
          </p>
        )}
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-600">{description}</p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-gray-900">${price}</span>
        <span className="text-sm font-semibold leading-6 text-gray-600">/user/month</span>
      </p>
      <button
        onClick={onSelect}
        className={cn(
          'mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          popular
            ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
            : 'bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'
        )}
      >
        Start free trial
      </button>
      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
        {features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <Check className="h-6 w-5 flex-none text-indigo-600" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}