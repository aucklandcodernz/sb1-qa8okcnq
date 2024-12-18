import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Calendar } from 'lucide-react';
import { SafetyCertificate } from '../../types/safety';
import { cn } from '../../lib/utils';

interface SafetyCertificateAlertProps {
  certificate: SafetyCertificate;
  className?: string;
}

export default function SafetyCertificateAlert({
  certificate,
  className,
}: SafetyCertificateAlertProps) {
  if (certificate.status !== 'EXPIRING_SOON' && certificate.status !== 'EXPIRED') return null;

  const isExpired = certificate.status === 'EXPIRED';
  const expiryDate = new Date(certificate.expiryDate!);

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
            {isExpired ? 'Safety Certificate Expired' : 'Safety Certificate Expiring Soon'}
          </h3>
          <div className={cn(
            'mt-2 text-sm',
            isExpired ? 'text-red-700' : 'text-yellow-700'
          )}>
            <p>
              {isExpired ? (
                <>
                  Your {certificate.type.replace('_', ' ')} certificate expired on{' '}
                  {format(expiryDate, 'MMMM d, yyyy')}. Please renew immediately.
                </>
              ) : (
                <>
                  Your {certificate.type.replace('_', ' ')} certificate will expire on{' '}
                  {format(expiryDate, 'MMMM d, yyyy')}. Please schedule renewal training.
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
                Schedule Renewal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}