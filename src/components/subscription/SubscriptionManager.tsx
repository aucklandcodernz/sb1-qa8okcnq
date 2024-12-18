import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { CreditCard, Users, Calendar, Settings } from 'lucide-react';
import { subscriptionAtom } from '../../lib/subscription';
import { cn } from '../../lib/utils';

export default function SubscriptionManager() {
  const [subscription] = useAtom(subscriptionAtom);

  if (!subscription) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No active subscription found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Subscription Details
          </h3>

          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                Plan
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {subscription.plan}
              </dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <Users className="mr-2 h-5 w-5 text-gray-400" />
                Active Users
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {subscription.activeUsers}/{subscription.maxUsers}
              </dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                Next Billing
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {format(new Date(subscription.nextBillingDate), 'MMM d, yyyy')}
              </dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <Settings className="mr-2 h-5 w-5 text-gray-400" />
                Status
              </dt>
              <dd className="mt-1">
                <span className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                )}>
                  {subscription.status}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Payment Method</h4>
            <div className="mt-2 flex items-center">
              <CreditCard className="h-8 w-8 text-gray-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  •••• •••• •••• {subscription.paymentMethod.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {subscription.paymentMethod.expiryMonth}/{subscription.paymentMethod.expiryYear}
                </p>
              </div>
              <button className="ml-auto text-sm text-indigo-600 hover:text-indigo-500">
                Update
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Billing History</h4>
            <div className="mt-2 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {subscription.billingHistory.map((bill) => (
                          <tr key={bill.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {format(new Date(bill.date), 'MMM d, yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${bill.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={cn(
                                'px-2 py-1 text-xs font-medium rounded-full',
                                bill.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              )}>
                                {bill.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                              <a href={bill.invoiceUrl} target="_blank" rel="noopener noreferrer">
                                Download
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}