import React from 'react';
import { SUBSCRIPTION_PLANS } from '../../lib/subscription/plans';
import PlanCard from './PlanCard';

interface PlanSelectorProps {
  selectedPlan?: string;
  onSelectPlan: (planId: string) => void;
}

export default function PlanSelector({ selectedPlan, onSelectPlan }: PlanSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {SUBSCRIPTION_PLANS.map((plan) => (
        <PlanCard
          key={plan.id}
          name={plan.name}
          price={plan.price}
          description={plan.description}
          features={plan.features}
          popular={plan.popular}
          onSelect={() => onSelectPlan(plan.id)}
        />
      ))}
    </div>
  );
}