import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  MessageSquare,
  Scale,
  Upload,
  Plus
} from 'lucide-react';
import { DisciplinaryCase } from '../../types/disciplinary';
import { cn } from '../../lib/utils';

interface DisciplinaryCaseDetailsProps {
  case_: DisciplinaryCase;
  onClose: () => void;
  onAddMeeting?: (data: any) => void;
  onAddEvidence?: (data: any) => void;
  onIssueWarning?: (data: any) => void;
  onResolveCase?: (data: any) => void;
  onFileAppeal?: (data: any) => void;
}

const statusConfig = {
  PENDING: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending',
  },
  IN_PROGRESS: {
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    label: 'In Progress',
  },
  RESOLVED: {
    icon: Scale,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Resolved',
  },
  APPEALED: {
    icon: Scale,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Appealed',
  },
};

export default function DisciplinaryCaseDetails({
  case_,
  onClose,
  onAddMeeting,
  onAddEvidence,
  onIssueWarning,
  onResolveCase,
  onFileAppeal,
}: DisciplinaryCaseDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'meetings' | 'evidence' | 'warnings'>('details');
  const status = statusConfig[case_.status];
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
                {case_.type.replace('_', ' ')}
              </h3>
              <p className="text-sm text-gray-500">
                Case ID: {case_.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
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
              onClick={() => setActiveTab('meetings')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'meetings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Meetings ({case_.meetings.length})
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'evidence'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Evidence ({case_.evidence?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('warnings')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'warnings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Warnings ({case_.warnings.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'details' && (
            <>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Description</h4>
                <p className="mt-2 text-sm text-gray-500">{case_.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Category</h4>
                  <p className="mt-2 text-sm text-gray-500">{case_.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Issue Date</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    {format(new Date(case_.issueDate), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              {case_.witnesses && case_.witnesses.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Witnesses</h4>
                  <ul className="mt-2 space-y-2">
                    {case_.witnesses.map((witness, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        {witness}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {case_.outcome && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900">Outcome</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">
                      Decision: {case_.outcome.decision.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Details: {case_.outcome.details}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {format(new Date(case_.outcome.date), 'MMMM d, yyyy')}
                    </p>
                    {case_.outcome.appealDeadline && (
                      <p className="text-sm text-gray-500">
                        Appeal Deadline: {format(new Date(case_.outcome.appealDeadline), 'MMMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {case_.appeal && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900">Appeal</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">
                      Status: {case_.appeal.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Reason: {case_.appeal.reason}
                    </p>
                    {case_.appeal.decision && (
                      <>
                        <p className="text-sm text-gray-500">
                          Decision: {case_.appeal.decision}
                        </p>
                        <p className="text-sm text-gray-500">
                          Decision Date: {format(new Date(case_.appeal.decisionDate!), 'MMMM d, yyyy')}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'meetings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">Meetings</h4>
                {onAddMeeting && (
                  <button
                    onClick={() => onAddMeeting({})}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </button>
                )}
              </div>

              {case_.meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {format(new Date(meeting.date), 'MMMM d, yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Attendees: {meeting.attendees.join(', ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Notes: {meeting.notes}
                  </p>
                  {meeting.outcome && (
                    <p className="mt-2 text-sm text-gray-500">
                      Outcome: {meeting.outcome}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">Evidence</h4>
                {onAddEvidence && (
                  <button
                    onClick={() => onAddEvidence({})}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Evidence
                  </button>
                )}
              </div>

              {case_.evidence?.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.type}
                        </p>
                        <p className="text-xs text-gray-500">
                          Uploaded by {item.uploadedBy} on {format(new Date(item.uploadedAt), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">Warnings</h4>
                {onIssueWarning && (
                  <button
                    onClick={() => onIssueWarning({})}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Issue Warning
                  </button>
                )}
              </div>

              {case_.warnings.map((warning) => (
                <div
                  key={warning.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {warning.type.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(warning.issueDate), 'MMMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {warning.details}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Issued by: {warning.issuedBy}</span>
                    {warning.expiryDate && (
                      <span>Expires: {format(new Date(warning.expiryDate), 'MMMM d, yyyy')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-end space-x-3">
            {case_.status === 'RESOLVED' && !case_.appeal && onFileAppeal && (
              <button
                onClick={() => onFileAppeal({})}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Scale className="h-4 w-4 mr-2" />
                File Appeal
              </button>
            )}
            {case_.status !== 'RESOLVED' && onResolveCase && (
              <button
                onClick={() => onResolveCase({})}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Resolve Case
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}