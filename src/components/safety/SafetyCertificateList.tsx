import React from 'react';
import { format } from 'date-fns';
import { Award, Calendar, Clock, Download, AlertTriangle } from 'lucide-react';
import { SafetyCertificate } from '../../types/safety';
import { cn } from '../../lib/utils';

interface SafetyCertificateListProps {
  certificates: SafetyCertificate[];
  onRenew?: (certificateId: string) => void;
  onDownload?: (certificateId: string) => void;
  className?: string;
}

const statusConfig = {
  ACTIVE: {
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Active',
  },
  EXPIRED: {
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Expired',
  },
  EXPIRING_SOON: {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Expiring Soon',
  },
  REVOKED: {
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Revoked',
  },
};

export default function SafetyCertificateList({
  certificates,
  onRenew,
  onDownload,
  className,
}: SafetyCertificateListProps) {
  // Sort certificates by status priority and date
  const sortedCertificates = [...certificates].sort((a, b) => {
    const statusPriority = {
      EXPIRED: 0,
      EXPIRING_SOON: 1,
      ACTIVE: 2,
      REVOKED: 3,
    };
    
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[a.status] - statusPriority[b.status];
    }
    
    return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
  });

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Award className="h-5 w-5 mr-2 text-gray-400" />
          Safety Certifications
        </h3>

        <div className="space-y-4">
          {sortedCertificates.map((cert) => {
            const status = statusConfig[cert.status];
            const isExpiringSoon = cert.status === 'EXPIRING_SOON';
            const isExpired = cert.status === 'EXPIRED';
            const daysUntilExpiry = cert.expiryDate
              ? Math.ceil((new Date(cert.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              : null;

            return (
              <div
                key={cert.id}
                className={cn(
                  'border rounded-lg overflow-hidden',
                  isExpired ? 'border-red-200 bg-red-50' :
                  isExpiringSoon ? 'border-yellow-200 bg-yellow-50' :
                  'border-gray-200'
                )}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        status.bgColor
                      )}>
                        <Award className={cn('h-6 w-6', status.color)} />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">
                            {cert.type.replace('_', ' ')}
                          </h4>
                          <span className={cn(
                            'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            status.bgColor,
                            status.color
                          )}>
                            {status.label}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Provider: {cert.provider}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Issued: {format(new Date(cert.issueDate), 'MMM d, yyyy')}
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Expires: {format(new Date(cert.expiryDate), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>

                  {(isExpiringSoon || isExpired) && (
                    <div className="mt-4 flex items-center">
                      <AlertTriangle className={cn(
                        'h-4 w-4 mr-1',
                        isExpired ? 'text-red-400' : 'text-yellow-400'
                      )} />
                      <span className={cn(
                        'text-sm',
                        isExpired ? 'text-red-700' : 'text-yellow-700'
                      )}>
                        {isExpired
                          ? 'Certificate has expired'
                          : `Expires in ${daysUntilExpiry} days`}
                      </span>
                    </div>
                  )}

                  {cert.documents.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Documents</h5>
                      <div className="space-y-2">
                        {cert.documents.map((doc) => (
                          <a
                            key={doc.id}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {doc.type}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end space-x-3">
                    {onDownload && (
                      <button
                        onClick={() => onDownload(cert.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    )}
                    {(isExpiringSoon || isExpired) && onRenew && (
                      <button
                        onClick={() => onRenew(cert.id)}
                        className={cn(
                          'inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                          isExpired
                            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                            : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                        )}
                      >
                        Schedule Renewal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {certificates.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No safety certificates found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}