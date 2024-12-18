import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeaturesProps {
  features: string[];
}

export default function PlanFeatures({ features }: PlanFeaturesProps) {
  return (
    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
      {features.map((feature) => (
        <li key={feature} className="flex gap-x-3">
          <Check className="h-6 w-5 flex-none text-indigo-600" />
          {feature}
        </li>
      ))}
    </ul>
  );
}