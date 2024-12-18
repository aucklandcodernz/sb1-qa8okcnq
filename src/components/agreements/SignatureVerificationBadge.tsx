import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SignatureVerificationBadgeProps {
  isValid: boolean;
  error?: string;
  className?: string;
}

export default function SignatureVerificationBadge({
  isValid,
  error,
  className,
}: SignatureVerificationBadgeProps) {
  return (
    <div className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm',
      isValid
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800',
      className
    )}>
      {isValid ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          Verified
        </>
      ) : (
        <>
          <XCircle className="h-4 w-4 mr-2" />
          Invalid
          {error && (
            <span className="ml-1 text-xs">({error})</span>
          )}
        </>
      )}
    </div>
  );
}