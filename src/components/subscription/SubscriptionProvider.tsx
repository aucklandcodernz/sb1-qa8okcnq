import React, { createContext, useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import { subscriptionAtom } from '../../lib/subscription';
import { userAtom } from '../../lib/auth';
import TrialBanner from './TrialBanner';

const SubscriptionContext = createContext<{
  isTrialPeriod: boolean;
  daysRemaining: number;
  isSubscriptionActive: boolean;
}>({
  isTrialPeriod: false,
  daysRemaining: 0,
  isSubscriptionActive: false,
});

export function useSubscription() {
  return useContext(SubscriptionContext);
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription] = useAtom(subscriptionAtom);
  const [user] = useAtom(userAtom);

  const isTrialPeriod = subscription?.status === 'TRIAL';
  const daysRemaining = subscription ? 
    Math.ceil((new Date(subscription.nextBillingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 
    0;
  const isSubscriptionActive = subscription?.status === 'ACTIVE';

  return (
    <SubscriptionContext.Provider value={{ isTrialPeriod, daysRemaining, isSubscriptionActive }}>
      {isTrialPeriod && daysRemaining <= 7 && user?.role === 'ORG_ADMIN' && (
        <TrialBanner daysRemaining={daysRemaining} />
      )}
      {children}
    </SubscriptionContext.Provider>
  );
}