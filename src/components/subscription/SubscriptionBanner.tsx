import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface SubscriptionBannerProps {
  daysRemaining: number;
}

export default function SubscriptionBanner({ daysRemaining }: SubscriptionBannerProps) {
  const navigate = useNavigate();

  if (daysRemaining > 7) return null;

  return (
    <div className="bg-indigo-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <AlertTriangle className="h-6 w-6 text-white" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">Trial ends in {daysRemaining} days!</span>
              <span className="hidden md:inline">
                Your free trial ends in {daysRemaining} days! Upgrade now to keep using all features.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <button
              onClick={() => navigate('/pricing')}
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}