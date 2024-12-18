import React from 'react';
import { FileText, Download, Calendar, Upload } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface EmployeeDocumentsProps {
  profile: EmployeeProfile;
  onUpload?: (file: File) => void;
  className?: string;
}

export default function EmployeeDocuments({
  profile,
  onUpload,
  className,
}: EmployeeDocumentsProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
          {onUpload && (
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="sr-only"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </label>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {profile.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    Uploaded on {format(new Date(doc.uploadedAt), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              <a
                href={doc.url}
                download
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </div>
          ))}

          {profile.documents.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No documents available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}