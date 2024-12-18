import React from 'react';
import { format } from 'date-fns';
import { Award, Calendar, Clock, Download, AlertTriangle } from 'lucide-react';
import { SafetyCertificate } from '../../types/safety';
import { cn } from '../../lib/utils';

interface SafetyTrainingCertificateProps {
  certificate: SafetyCertificate;
  onRenew?: () => void;
  onDownload?: () => void;
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

export default function SafetyTrainingCertificate({
  certificate,
  onRenew,
  onDownload,
  className,
}: SafetyTrainingCertificateProps) {
  const status = statusConfig[certificate.status];
  const isExpiringSoon = certificate.status === 'EXPIRING_SOON';
  const isExpired = certificate.status === 'EXPIRED';

  const daysUntilExpiry = certificate.expiryDate
    ? Math.ceil((new Date(certificate.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={cn(
              'h-10 w-10 rounded-lg flex items-center justify-center',
              status.bgColor
            )}>
              <Award className={cn('h-6 w-6', status.color)} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {certificate.type.replace('_', ' ')} Certificate
              </h3>
              <p className="text-sm text-gray-500">
                Provider: {certificate.provider}
              </p>
            </div>
          </div>
          <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            status.bgColor,
            status.color
          )}>
            {status.label}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Issue Date</p>
            <p className="mt-1 flex items-center text-sm text-gray-900">
              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
              {format(new Date(certificate.issueDate), 'MMMM d, yyyy')}
            </p>
          </div>
          {certificate.expiryDate && (
            <div>
              <p className="text-sm font-medium text-gray-500">Expiry Date</p>
              <p className="mt-1 flex items-center text-sm text-gray-900">
                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                {format(new Date(certificate.expiryDate), 'MMMM d, yyyy')}
              </p>
            </div>
          )}
        </div>

        {certificate.certificateNumber && (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">Certificate Number</p>
            <p className="mt-1 text-sm text-gray-900">
              {certificate.certificateNumber}
            </p>
          </div>
        )}

        {(isExpiringSoon || isExpired) && (
          <div className={cn(
            'mt-6 rounded-md p-4',
            isExpired ? 'bg-red-50' : 'bg-yellow-50'
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
                  {isExpired ? 'Certificate Expired' : 'Certificate Expiring Soon'}
                </h3>
                <div className={cn(
                  'mt-2 text-sm',
                  isExpired ? 'text-red-700' : 'text-yellow-700'
                )}>
                  {isExpired ? (
                    <p>This certificate has expired. Please renew immediately to maintain compliance.</p>
                  ) : (
                    <p>This certificate will expire in {daysUntilExpiry} days. Please schedule renewal training.</p>
                  )}
                </div>
                {onRenew && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={onRenew}
                      className={cn(
                        'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm',
                        isExpired
                          ? 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
                          : 'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2'
                      )}
                    >
                      Schedule Renewal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {certificate.documents.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Documents</h4>
            <ul className="mt-2 divide-y divide-gray-200">
              {certificate.documents.map((doc) => (
                <li key={doc.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">
                      {doc.type}
                    </span>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex-shrink-0 flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {onDownload && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onDownload}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}