import React, { useState } from 'react';
import { format } from 'date-fns';
import { FileText, Clock, CheckCircle, XCircle, Download, Printer } from 'lucide-react';
import { EmploymentAgreement } from '../../types/agreements';
import { cn } from '../../lib/utils';

interface AgreementDetailsProps {
  agreement: EmploymentAgreement;
  onClose: () => void;
  onSign?: (type: 'employee' | 'employer') => void;
  onPrint?: () => void;
  onDownload?: () => void;
}

const statusConfig = {
  DRAFT: {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Draft',
  },
  PENDING_SIGNATURE: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending Signature',
  },
  SIGNED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Signed',
  },
  EXPIRED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Expired',
  },
  TERMINATED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Terminated',
  },
};

export default function AgreementDetails({
  agreement,
  onClose,
  onSign,
  onPrint,
  onDownload,
}: AgreementDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'terms' | 'signatures'>('details');
  const status = statusConfig[agreement.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className={cn(
              'h-10 w-10 rounded-lg flex items-center justify-center mr-4',
              status.bgColor
            )}>
              <StatusIcon className={cn('h-6 w-6', status.color)} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {agreement.position}
              </h3>
              <p className="text-sm text-gray-500">
                {agreement.type.replace('_', ' ')} Agreement
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onPrint && (
              <button
                onClick={onPrint}
                className="p-2 text-gray-400 hover:text-gray-500"
                title="Print"
              >
                <Printer className="h-5 w-5" />
              </button>
            )}
            {onDownload && (
              <button
                onClick={onDownload}
                className="p-2 text-gray-400 hover:text-gray-500"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'details'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'terms'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveTab('signatures')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'signatures'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Signatures
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'details' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Employment Details</h4>
                  <dl className="mt-2 space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Position</dt>
                      <dd className="text-sm text-gray-900">{agreement.position}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Department</dt>
                      <dd className="text-sm text-gray-900">{agreement.department}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Start Date</dt>
                      <dd className="text-sm text-gray-900">
                        {format(new Date(agreement.startDate), 'MMMM d, yyyy')}
                      </dd>
                    </div>
                    {agreement.endDate && (
                      <div>
                        <dt className="text-sm text-gray-500">End Date</dt>
                        <dd className="text-sm text-gray-900">
                          {format(new Date(agreement.endDate), 'MMMM d, yyyy')}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900">Salary & Hours</h4>
                  <dl className="mt-2 space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Salary</dt>
                      <dd className="text-sm text-gray-900">
                        {agreement.salary.amount.toLocaleString()} {agreement.salary.currency} ({agreement.salary.frequency.toLowerCase()})
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Working Hours</dt>
                      <dd className="text-sm text-gray-900">
                        {agreement.workingHours.hoursPerWeek} hours per week
                        <br />
                        {agreement.workingHours.standardHours.start} - {agreement.workingHours.standardHours.end}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {agreement.benefits && agreement.benefits.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Benefits</h4>
                  <ul className="mt-2 space-y-2">
                    {agreement.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium text-gray-900">{benefit.type}:</span>
                        <span className="ml-2 text-gray-500">{benefit.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              {agreement.terms?.map((term, index) => (
                <div key={index}>
                  <h4 className="text-sm font-medium text-gray-900">{term.section}</h4>
                  <p className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'signatures' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Employee Signature</h4>
                {agreement.signatures.employeeSignature ? (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Signed on: {format(new Date(agreement.signatures.employeeSignature.signedAt), 'MMMM d, yyyy HH:mm')}</p>
                    {agreement.signatures.employeeSignature.ipAddress && (
                      <p>IP Address: {agreement.signatures.employeeSignature.ipAddress}</p>
                    )}
                  </div>
                ) : onSign && (
                  <button
                    onClick={() => onSign('employee')}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign Agreement
                  </button>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">Employer Signature</h4>
                {agreement.signatures.employerSignature ? (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Signed by: {agreement.signatures.employerSignature.signedBy}</p>
                    <p>Signed on: {format(new Date(agreement.signatures.employerSignature.signedAt), 'MMMM d, yyyy HH:mm')}</p>
                    {agreement.signatures.employerSignature.ipAddress && (
                      <p>IP Address: {agreement.signatures.employerSignature.ipAddress}</p>
                    )}
                  </div>
                ) : onSign && (
                  <button
                    onClick={() => onSign('employer')}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign as Employer
                  </button>
                )}
              </div>

              {agreement.reminders.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Reminders</h4>
                  <ul className="mt-2 space-y-2">
                    {agreement.reminders.map((reminder, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        {reminder.type.replace('_', ' ')} - {format(new Date(reminder.sentAt), 'MMMM d, yyyy')}
                        <span className={cn(
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          reminder.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        )}>
                          {reminder.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}