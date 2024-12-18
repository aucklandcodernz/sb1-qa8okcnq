import React from 'react';
import { format } from 'date-fns';
import { FileText, Download, Tag, Clock, Users } from 'lucide-react';
import { Document } from '../../types/documents';
import { cn } from '../../lib/utils';

interface DocumentListProps {
  documents: Document[];
}

const typeConfig = {
  CONTRACT: { color: 'text-blue-500', bgColor: 'bg-blue-50' },
  POLICY: { color: 'text-green-500', bgColor: 'bg-green-50' },
  FORM: { color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  REPORT: { color: 'text-purple-500', bgColor: 'bg-purple-50' },
  OTHER: { color: 'text-gray-500', bgColor: 'bg-gray-50' },
};

export default function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {documents.map((doc) => (
              <li key={doc.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      typeConfig[doc.type].bgColor
                    )}>
                      <FileText className={cn('h-6 w-6', typeConfig[doc.type].color)} />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {doc.title}
                    </p>
                    {doc.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {doc.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {format(new Date(doc.updatedAt), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {doc.accessRoles.join(', ')}
                      </div>
                    </div>
                    {doc.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </div>
                </div>
              </li>
            ))}
            {documents.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No documents found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}