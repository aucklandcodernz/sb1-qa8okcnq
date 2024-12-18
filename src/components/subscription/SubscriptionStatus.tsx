import React from 'react';
import { format } from 'date-fns';
import { Clock, CreditCard } from 'lucide-react';
import { Subscription } from '../../lib/subscription';
import { cn } from '../../lib/utils';

interface SubscriptionStatusProps {
  subscription: Subscription;
  onUpdatePayment: () => void;
}

export default function SubscriptionStatus({ subscription, onUpdatePayment }: SubscriptionStatusProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Subscription Status</h3>
        
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Current Plan</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{subscription.plan}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className={cn(
              'mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            )}>
              {subscription.status}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Users</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {subscription.activeUsers} / {subscription.maxUsers}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Next Billing Date</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {format(new Date(subscription.nextBillingDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Method</p>
              <div className="mt-1 flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-900">
                  •••• {subscription.paymentMethod.last4}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  Expires {subscription.paymentMethod.expiryMonth}/{subscription.paymentMethod.expiryYear}
                </span>
              </div>
            </div>
            <button
              onClick={onUpdatePayment}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}