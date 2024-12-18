import React from 'react';
import { format } from 'date-fns';
import { BadgeCheck, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { VisaDetails as VisaDetailsType } from '../../types/visa';
import { cn } from '../../lib/utils';

interface VisaDetailsProps {
  visa: VisaDetailsType;
  onVerify?: (isVerified: boolean) => void;
  onUploadDocument?: (file: File) => void;
  className?: string;
}

const statusConfig = {
  ACTIVE: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Active',
  },
  EXPIRED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Expired',
  },
  EXPIRING_SOON: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Expiring Soon',
  },
  CANCELLED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Cancelled',
  },
};

export default function VisaDetails({
  visa,
  onVerify,
  onUploadDocument,
  className,
}: VisaDetailsProps) {
  const status = statusConfig[visa.status];
  const StatusIcon = status.icon;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUploadDocument) {
      onUploadDocument(file);
    }
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <BadgeCheck className="h-5 w-5 mr-2 text-gray-400" />
            Visa Details
          </h3>
          <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            status.bgColor,
            status.color
          )}>
            <StatusIcon className="h-4 w-4 mr-1" />
            {status.label}
          </span>
        </div>

        <div className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Visa Type</label>
              <p className="mt-1 text-sm text-gray-900">{visa.type.replace('_', ' ')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Visa Number</label>
              <p className="mt-1 text-sm text-gray-900">{visa.visaNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Start Date</label>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(visa.startDate), 'MMMM d, yyyy')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Expiry Date</label>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(visa.expiryDate), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          {/* Work Rights */}
          <div>
            <h4 className="text-sm font-medium text-gray-900">Work Rights</h4>
            <div className="mt-2 bg-gray-50 rounded-lg p-4">
              {visa.workRights.maxHoursPerWeek && (
                <p className="text-sm text-gray-700">
                  Maximum {visa.workRights.maxHoursPerWeek} hours per week
                </p>
              )}
              {visa.workRights.restrictions?.map((restriction, index) => (
                <p key={index} className="text-sm text-gray-700 mt-1">
                  • {restriction}
                </p>
              ))}
            </div>
          </div>

          {/* Conditions */}
          {visa.conditions && visa.conditions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Conditions</h4>
              <ul className="mt-2 space-y-1">
                {visa.conditions.map((condition, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {condition}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Documents */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-900">Documents</h4>
              {onUploadDocument && (
                <label className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  Upload Document
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            <div className="space-y-2">
              {visa.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <BadgeCheck className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.type}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded on {format(new Date(doc.uploadedAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Verification Status</h4>
                <p className="mt-1 text-sm text-gray-500">
                  {visa.verificationStatus === 'VERIFIED' ? (
                    <>
                      Verified by {visa.verifiedBy} on{' '}
                      {format(new Date(visa.verifiedAt!), 'MMM d, yyyy')}
                    </>
                  ) : (
                    'Pending verification'
                  )}
                </p>
              </div>
              {onVerify && visa.verificationStatus === 'PENDING' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onVerify(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verify
                  </button>
                  <button
                    onClick={() => onVerify(false)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          {visa.notifications.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Notifications</h4>
              <div className="space-y-2">
                {visa.notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-900">
                          {notification.type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(notification.sentAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      notification.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    )}>
                      {notification.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}