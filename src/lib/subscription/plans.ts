export const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 6,
    description: 'Perfect for small businesses',
    features: [
      'Up to 10 employees',
      'Time & attendance tracking',
      'Leave management',
      'Basic reporting',
      'Mobile app access',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 12,
    description: 'Best for growing teams',
    features: [
      'Up to 50 employees',
      'All Starter features',
      'Performance management',
      'Training & development',
      'Advanced reporting',
      'Document management',
      'Compliance tools',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 24,
    description: 'For large organizations',
    features: [
      'Unlimited employees',
      'All Professional features',
      'Custom integrations',
      'Dedicated support',
      'API access',
      'Advanced analytics',
      'Custom branding',
    ],
  },
];

export const TRIAL_PERIOD_DAYS = 14;

export function getPlanById(planId: string) {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
}

export function getPlanLimits(planId: string) {
  switch (planId) {
    case 'starter':
      return { maxEmployees: 10 };
    case 'professional':
      return { maxEmployees: 50 };
    case 'enterprise':
      return { maxEmployees: Infinity };
    default:
      return { maxEmployees: 0 };
  }
}