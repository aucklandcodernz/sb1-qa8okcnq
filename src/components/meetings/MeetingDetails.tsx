import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  Users,
  FileText,
  MessageSquare,
  Plus,
  Check,
  X
} from 'lucide-react';
import { Meeting } from '../../types/meetings';
import { cn } from '../../lib/utils';

interface MeetingDetailsProps {
  meeting: Meeting;
  onClose: () => void;
  onAddNote?: (note: string) => void;
  onAddDocument?: (document: File) => void;
  onUpdateAttendeeStatus?: (attendeeId: string, status: 'ACCEPTED' | 'DECLINED' | 'TENTATIVE') => void;
}

const locationIcons = {
  IN_PERSON: MapPin,
  VIDEO: Video,
  PHONE: Phone,
};

const statusConfig = {
  SCHEDULED: {
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Scheduled',
  },
  IN_PROGRESS: {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'In Progress',
  },
  COMPLETED: {
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
  CANCELLED: {
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Cancelled',
  },
};

export default function MeetingDetails({
  meeting,
  onClose,
  onAddNote,
  onAddDocument,
  onUpdateAttendeeStatus,
}: MeetingDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'attendees' | 'documents' | 'notes'>('details');
  const [newNote, setNewNote] = useState('');
  const LocationIcon = locationIcons[meeting.location];
  const status = statusConfig[meeting.status];

  const handleAddNote = () => {
    if (newNote.trim() && onAddNote) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAddDocument) {
      onAddDocument(file);
    }
  };

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
              <LocationIcon className={cn('h-6 w-6', status.color)} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
              <p className="text-sm text-gray-500">
                Organized by {meeting.organizer.name}
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
              onClick={() => setActiveTab('attendees')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'attendees'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Attendees ({meeting.attendees.length})
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'documents'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Documents ({meeting.documents?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={cn(
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                activeTab === 'notes'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Notes ({meeting.notes?.length || 0})
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'details' && (
            <>
              {meeting.description && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Description</h4>
                  <p className="mt-2 text-sm text-gray-500">{meeting.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    Date & Time
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    {format(new Date(meeting.startDate), 'MMMM d, yyyy')}
                    <br />
                    {format(new Date(meeting.startDate), 'HH:mm')} - {format(new Date(meeting.endDate), 'HH:mm')}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <LocationIcon className="h-4 w-4 mr-2 text-gray-400" />
                    Location
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    {meeting.location === 'IN_PERSON' && meeting.locationDetails?.room && (
                      <>
                        Room: {meeting.locationDetails.room}
                        {meeting.locationDetails.address && (
                          <><br />{meeting.locationDetails.address}</>
                        )}
                      </>
                    )}
                    {meeting.location === 'VIDEO' && meeting.locationDetails?.videoLink && (
                      <a
                        href={meeting.locationDetails.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Join Video Call
                      </a>
                    )}
                    {meeting.location === 'PHONE' && meeting.locationDetails?.phoneNumber && (
                      <>Dial: {meeting.locationDetails.phoneNumber}</>
                    )}
                  </p>
                </div>
              </div>

              {meeting.agenda && meeting.agenda.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Agenda</h4>
                  <ul className="mt-2 space-y-2">
                    {meeting.agenda.map((item, index) => (
                      <li key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {index + 1}. {item.title}
                        </span>
                        <span className="text-gray-400">
                          {item.duration} mins
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {activeTab === 'attendees' && (
            <div className="space-y-4">
              {meeting.attendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{attendee.name}</p>
                      <p className="text-xs text-gray-500">{attendee.role}</p>
                    </div>
                  </div>
                  {onUpdateAttendeeStatus && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateAttendeeStatus(attendee.id, 'ACCEPTED')}
                        className={cn(
                          'p-1 rounded-full',
                          attendee.status === 'ACCEPTED'
                            ? 'bg-green-100 text-green-600'
                            : 'text-gray-400 hover:text-green-600'
                        )}
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onUpdateAttendeeStatus(attendee.id, 'DECLINED')}
                        className={cn(
                          'p-1 rounded-full',
                          attendee.status === 'DECLINED'
                            ? 'bg-red-100 text-red-600'
                            : 'text-gray-400 hover:text-red-600'
                        )}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              {onAddDocument && (
                <div className="flex justify-end">
                  <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              )}

              {meeting.documents?.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded by {doc.uploadedBy} on {format(new Date(doc.uploadedAt), 'MMM d, yyyy')}
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
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              {onAddNote && (
                <div className="flex space-x-2">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={2}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Add a note..."
                  />
                  <button
                    onClick={handleAddNote}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add
                  </button>
                </div>
              )}

              {meeting.notes?.map((note) => (
                <div
                  key={note.id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-xs text-gray-500">
                      {note.createdBy} - {format(new Date(note.createdAt), 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}