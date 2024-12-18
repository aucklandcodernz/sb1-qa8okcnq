import React from 'react';
import { format } from 'date-fns';
import { Shield, Users, Calendar, FileText } from 'lucide-react';
import { BenefitEnrollment } from '../../../lib/employee/benefits';
import { cn } from '../../../lib/utils';

interface BenefitEnrollmentCardProps {
  enrollment: BenefitEnrollment;
  planName: string;
  onViewDetails?: () => void;
  className?: string;
}

const statusConfig = {
  PENDING: { color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  ACTIVE: { color: 'text-green-500', bgColor: 'bg-green-50' },
  CANCELLED: { color: 'text-red-500', bgColor: 'bg-red-50' },
  TERMINATED: { color: 'text-gray-500', bgColor: 'bg-gray-50' },
};

export default function BenefitEnrollmentCard({
  enrollment,
  planName,
  onViewDetails,
  className,
}: BenefitEnrollmentCardProps) {
  const status = statusConfig[enrollment.status];

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">{planName}</h3>
          </div>
          <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            status.bgColor,
            status.color
          )}>
            {enrollment.status}
          </span>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Coverage Type
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {enrollment.coverageType}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Start Date
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(enrollment.startDate), 'MMM d, yyyy')}
            </dd>
          </div>

          {enrollment.endDate && (
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                End Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(new Date(enrollment.endDate), 'MMM d, yyyy')}
              </dd>
            </div>
          )}

          {enrollment.dependents && enrollment.dependents.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Dependents
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul className="divide-y divide-gray-200">
                  {enrollment.dependents.map((dependent, index) => (
                    <li key={index} className="py-2">
                      <div className="flex justify-between">
                        <span>{dependent.name}</span>
                        <span className="text-gray-500">
                          {dependent.relationship}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}

          {enrollment.documents.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Documents
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul className="divide-y divide-gray-200">
                  {enrollment.documents.map((doc) => (
                    <li key={doc.id} className="py-2">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-indigo-600 hover:text-indigo-900"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        {doc.type}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>

        {onViewDetails && (
          <div className="mt-6">
            <button
              onClick={onViewDetails}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}