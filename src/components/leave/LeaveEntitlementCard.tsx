import React from 'react';
import { Calendar, AlertTriangle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { LeaveBalance } from '../../types/leave';
import { checkLeaveCompliance, checkExpiringLeave } from '../../lib/leave/entitlements';
import { cn } from '../../lib/utils';

interface LeaveEntitlementCardProps {
  employeeId: string;
  balance: LeaveBalance;
  startDate: Date;
  className?: string;
}

export default function LeaveEntitlementCard({
  employeeId,
  balance,
  startDate,
  className,
}: LeaveEntitlementCardProps) {
  const compliance = checkLeaveCompliance(employeeId, balance, startDate);
  const expiryCheck = checkExpiringLeave(balance);

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-gray-400" />
          Leave Entitlements
        </h3>

        <div className="space-y-4">
          {/* Leave Balances */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900">Annual Leave</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {balance.annual} hours
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900">Sick Leave</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {balance.sick} days
              </p>
            </div>
          </div>

          {/* Compliance Issues */}
          {!compliance.isCompliant && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Leave Entitlement Issues
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {compliance.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expiring Leave Warning */}
          {expiryCheck.isExpiring && (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Leave Expiring Soon
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      You have leave that will expire on{' '}
                      {format(expiryCheck.expiryDate, 'MMMM d, yyyy')}.
                      Please plan your leave accordingly.
                    </p>
                  </div>
                  <div className="mt-3">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        className="px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
                      >
                        Request Leave
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Leave Types */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900">Parental Leave</p>
              <p className="mt-1 text-sm text-gray-500">
                Up to {balance.parental} weeks available
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900">Bereavement Leave</p>
              <p className="mt-1 text-sm text-gray-500">
                {balance.bereavement} days available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}