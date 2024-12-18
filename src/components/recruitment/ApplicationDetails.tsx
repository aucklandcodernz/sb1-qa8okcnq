import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Calendar,
  Video,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { JobApplication, ApplicationStatus } from '../../types/recruitment';
import { updateApplicationStatus, scheduleInterview } from '../../lib/recruitment';
import { cn } from '../../lib/utils';
import ScheduleInterviewForm from './ScheduleInterviewForm';

interface ApplicationDetailsProps {
  application: JobApplication;
  onClose: () => void;
}

const statusConfig = {
  NEW: {
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'New Application',
  },
  SCREENING: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'In Screening',
  },
  INTERVIEW: {
    icon: Calendar,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    label: 'Interview Stage',
  },
  OFFER: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Offer Extended',
  },
  HIRED: {
    icon: CheckCircle,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    label: 'Hired',
  },
  REJECTED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Rejected',
  },
};

export default function ApplicationDetails({ application, onClose }: ApplicationDetailsProps) {
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [note, setNote] = useState('');

  const handleStatusChange = async (status: ApplicationStatus) => {
    await updateApplicationStatus(application.id, status, note);
    setNote('');
  };

  const handleScheduleInterview = async (data: any) => {
    await scheduleInterview(application.id, data);
    setShowInterviewForm(false);
  };

  const status = statusConfig[application.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
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
                Application Details
              </h3>
              <p className="text-sm text-gray-500">
                Job ID: {application.jobId}
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

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Candidate Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-900">
                  {application.candidate.firstName} {application.candidate.lastName}
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a 
                  href={`mailto:${application.candidate.email}`}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  {application.candidate.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-900">
                  {application.candidate.phone}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">
                  Applied: {format(new Date(application.appliedAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Documents</h4>
            <div className="space-y-2">
              <a
                href={application.candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-900"
              >
                <FileText className="h-5 w-5 mr-2" />
                Resume
              </a>
              {application.candidate.coverLetterUrl && (
                <a
                  href={application.candidate.coverLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Cover Letter
                </a>
              )}
            </div>
          </div>

          {application.interviews.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Interviews</h4>
              <div className="space-y-4">
                {application.interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {interview.type === 'VIDEO' ? (
                          <Video className="h-5 w-5 text-gray-400 mr-2" />
                        ) : (
                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {interview.type === 'VIDEO' ? 'Video Interview' : 'In-Person Interview'}
                        </span>
                      </div>
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        interview.status === 'SCHEDULED' ? 'bg-yellow-50 text-yellow-800' :
                        interview.status === 'COMPLETED' ? 'bg-green-50 text-green-800' :
                        'bg-red-50 text-red-800'
                      )}>
                        {interview.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {format(new Date(interview.scheduledAt), 'MMM d, yyyy HH:mm')}
                    </p>
                    {interview.feedback && (
                      <div className="mt-2 border-t border-gray-200 pt-2">
                        <p className="text-sm font-medium text-gray-900">Feedback</p>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-gray-500">Rating: {interview.feedback.rating}/5</p>
                          <p className="text-sm text-gray-500">
                            Recommendation: {interview.feedback.recommendation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Notes</h4>
            <div className="space-y-4">
              {application.notes.map((note) => (
                <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(note.createdAt), 'MMM d, yyyy HH:mm')}
                  </p>
                  <p className="text-sm text-gray-900">{note.content}</p>
                </div>
              ))}
              <div className="mt-4">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Add a note..."
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleStatusChange('SCREENING')}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Move to Screening
                </button>
                <button
                  onClick={() => setShowInterviewForm(true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Schedule Interview
                </button>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleStatusChange('REJECTED')}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusChange('OFFER')}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Extend Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showInterviewForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <ScheduleInterviewForm
              onSubmit={handleScheduleInterview}
              onCancel={() => setShowInterviewForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}