import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Calendar } from 'lucide-react';
import { VisaDetails } from '../../types/visa';
import { cn } from '../../lib/utils';

interface VisaExpiryAlertProps {
  visa: VisaDetails;
  className?: string;
}

export default function VisaExpiryAlert({ visa, className }: VisaExpiryAlertProps) {
  if (visa.status !== 'EXPIRING_SOON' && visa.status !== 'EXPIRED') return null;

  const isExpired = visa.status === 'EXPIRED';
  const expiryDate = new Date(visa.expiryDate);

  return (
    <div className={cn(
      'rounded-md p-4',
      isExpired ? 'bg-red-50' : 'bg-yellow-50',
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className={cn(
            'h-5 w-5',
            isExpired ? 'text-red-400' : 'text-yellow-400'
          )} />
        </div>
        <div className="ml-3">
          <h3 className={cn(
            'text-sm font-medium',
            isExpired ? 'text-red-800' : 'text-yellow-800'
          )}>
            {isExpired ? 'Visa Expired' : 'Visa Expiring Soon'}
          </h3>
          <div className={cn(
            'mt-2 text-sm',
            isExpired ? 'text-red-700' : 'text-yellow-700'
          )}>
            <p>
              {isExpired ? (
                <>
                  This visa expired on {format(expiryDate, 'MMMM d, yyyy')}.
                  Immediate action is required.
                </>
              ) : (
                <>
                  This visa will expire on {format(expiryDate, 'MMMM d, yyyy')}.
                  Please ensure renewal process is initiated.
                </>
              )}
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium',
                  isExpired
                    ? 'text-red-800 hover:bg-red-100'
                    : 'text-yellow-800 hover:bg-yellow-100',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isExpired
                    ? 'focus:ring-red-500'
                    : 'focus:ring-yellow-500'
                )}
              >
                Initiate Renewal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}