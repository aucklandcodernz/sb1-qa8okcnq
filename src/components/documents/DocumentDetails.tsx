import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  FileText,
  Tag,
  Users,
  Clock,
  Share2,
  Archive,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import { Document } from '../../types/documents';
import { cn } from '../../lib/utils';

interface DocumentDetailsProps {
  document: Document;
  onArchive?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

const typeConfig = {
  CONTRACT: { color: 'text-blue-500', bgColor: 'bg-blue-50' },
  POLICY: { color: 'text-green-500', bgColor: 'bg-green-50' },
  FORM: { color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  REPORT: { color: 'text-purple-500', bgColor: 'bg-purple-50' },
  OTHER: { color: 'text-gray-500', bgColor: 'bg-gray-50' },
};

export default function DocumentDetails({
  document,
  onArchive,
  onDelete,
  onShare,
}: DocumentDetailsProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={cn(
              'h-10 w-10 rounded-lg flex items-center justify-center mr-4',
              typeConfig[document.type].bgColor
            )}>
              <FileText className={cn('h-6 w-6', typeConfig[document.type].color)} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
              {document.description && (
                <p className="mt-1 text-sm text-gray-500">{document.description}</p>
              )}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  {onShare && (
                    <button
                      onClick={() => {
                        onShare();
                        setShowActions(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Share2 className="h-4 w-4 mr-3" />
                      Share
                    </button>
                  )}
                  {onArchive && (
                    <button
                      onClick={() => {
                        onArchive();
                        setShowActions(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Archive className="h-4 w-4 mr-3" />
                      Archive
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => {
                        onDelete();
                        setShowActions(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Created
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(document.createdAt), 'MMM d, yyyy')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Access
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {document.accessRoles.join(', ')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Size
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {(document.fileSize / 1024 / 1024).toFixed(2)} MB
            </dd>
          </div>
        </dl>

        {document.tags.length > 0 && (
          <div className="mt-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
              <Tag className="h-4 w-4 mr-1" />
              Tags
            </dt>
            <dd className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        )}
      </div>
    </div>
  );
}