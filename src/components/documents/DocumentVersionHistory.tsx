import React from 'react';
import { format } from 'date-fns';
import { History, Clock, User, FileText } from 'lucide-react';
import { DocumentVersion } from '../../types/documents';
import { cn } from '../../lib/utils';

interface DocumentVersionHistoryProps {
  versions: DocumentVersion[];
  currentVersion: number;
  onVersionSelect: (version: DocumentVersion) => void;
}

export default function DocumentVersionHistory({
  versions,
  currentVersion,
  onVersionSelect,
}: DocumentVersionHistoryProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <History className="h-5 w-5 mr-2 text-gray-400" />
          Version History
        </h3>
        
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {versions.map((version) => (
              <li
                key={version.id}
                className={cn(
                  'py-4 cursor-pointer hover:bg-gray-50',
                  version.version === currentVersion && 'bg-blue-50'
                )}
                onClick={() => onVersionSelect(version)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Version {version.version}
                      {version.version === currentVersion && (
                        <span className="ml-2 text-xs text-blue-600">(Current)</span>
                      )}
                    </p>
                    {version.changes && (
                      <p className="mt-1 text-sm text-gray-500">
                        {version.changes}
                      </p>
                    )}
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {version.createdBy}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {format(new Date(version.createdAt), 'MMM d, yyyy HH:mm')}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {(version.fileSize / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <div>
                    <a
                      href={version.fileUrl}
                      download
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}