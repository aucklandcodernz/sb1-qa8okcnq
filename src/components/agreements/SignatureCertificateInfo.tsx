import React from 'react';
import { format } from 'date-fns';
import { Shield, Clock, AlertTriangle } from 'lucide-react';
import { SignatureCertificate } from '../../types/signatures';
import { cn } from '../../lib/utils';

interface SignatureCertificateInfoProps {
  certificate: SignatureCertificate;
  className?: string;
}

export default function SignatureCertificateInfo({
  certificate,
  className,
}: SignatureCertificateInfoProps) {
  const isExpired = new Date(certificate.expiresAt) < new Date();
  const daysUntilExpiry = Math.ceil(
    (new Date(certificate.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center">
        <Shield className={cn(
          'h-5 w-5 mr-2',
          certificate.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'
        )} />
        <span className={cn(
          'text-sm font-medium',
          certificate.status === 'ACTIVE' ? 'text-green-700' : 'text-red-700'
        )}>
          Certificate {certificate.status.toLowerCase()}
        </span>
      </div>

      <div className="text-sm space-y-2">
        <p className="text-gray-500">
          Created: {format(new Date(certificate.createdAt), 'MMMM d, yyyy')}
        </p>
        <p className="text-gray-500">
          Expires: {format(new Date(certificate.expiresAt), 'MMMM d, yyyy')}
        </p>
      </div>

      {certificate.status === 'ACTIVE' && !isExpired && daysUntilExpiry <= 30 && (
        <div className="flex items-center text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
          Expires in {daysUntilExpiry} days
        </div>
      )}

      {isExpired && (
        <div className="flex items-center text-sm text-red-700 bg-red-50 p-2 rounded">
          <Clock className="h-4 w-4 mr-2 text-red-400" />
          Certificate has expired
        </div>
      )}
    </div>
  );
}