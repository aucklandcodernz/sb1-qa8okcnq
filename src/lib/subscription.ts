import { atom } from 'jotai';

export interface Subscription {
  id: string;
  organizationId: string;
  plan: string;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  activeUsers: number;
  maxUsers: number;
  nextBillingDate: string;
  paymentMethod: {
    last4: string;
    expiryMonth: string;
    expiryYear: string;
  };
  billingHistory: {
    id: string;
    date: string;
    amount: number;
    status: 'PAID' | 'FAILED';
    invoiceUrl: string;
  }[];
}

export const subscriptionAtom = atom<Subscription | null>(null);

export const updatePaymentMethod = async (paymentDetails: {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  name: string;
}): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Update subscription with new payment method
  subscriptionAtom.init = subscriptionAtom.init ? {
    ...subscriptionAtom.init,
    paymentMethod: {
      last4: paymentDetails.cardNumber.slice(-4),
      expiryMonth: paymentDetails.expiryMonth,
      expiryYear: paymentDetails.expiryYear,
    },
  } : null;
};

export const upgradePlan = async (planId: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Update subscription with new plan
  subscriptionAtom.init = subscriptionAtom.init ? {
    ...subscriptionAtom.init,
    plan: planId,
  } : null;
};

export const cancelSubscription = async (): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Update subscription status
  subscriptionAtom.init = subscriptionAtom.init ? {
    ...subscriptionAtom.init,
    status: 'CANCELLED',
  } : null;
};