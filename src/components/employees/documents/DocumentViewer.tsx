import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface DocumentViewerProps {
  document: {
    name: string;
    type: string;
    url: string;
    size?: number;
  };
  className?: string;
}

export default function DocumentViewer({ document, className }: DocumentViewerProps) {
  const isImage = document.type.startsWith('image/');
  const isPDF = document.type === 'application/pdf';

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-400" />
            Document Preview
          </h3>
          <div className="flex space-x-2">
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </a>
            <a
              href={document.url}
              download
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden bg-gray-50">
          {isImage ? (
            <img
              src={document.url}
              alt={document.name}
              className="w-full h-auto"
            />
          ) : isPDF ? (
            <iframe
              src={`${document.url}#view=FitH`}
              className="w-full h-[600px]"
              title={document.name}
            />
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Preview not available for this file type
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {document.type}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}