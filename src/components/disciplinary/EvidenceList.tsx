import React from 'react';
import { format } from 'date-fns';
import { FileText, Download, Trash2, Image, FileArchive } from 'lucide-react';
import { Evidence } from '../../lib/evidence';
import { cn } from '../../lib/utils';

interface EvidenceListProps {
  evidence: Evidence[];
  onDelete?: (evidenceId: string) => void;
  className?: string;
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return Image;
  if (mimeType.includes('pdf')) return FileText;
  return FileArchive;
};

export default function EvidenceList({
  evidence,
  onDelete,
  className,
}: EvidenceListProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {evidence.map((item) => {
        const Icon = getFileIcon(item.type);

        return (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-white flex items-center justify-center">
                <Icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {item.metadata?.fileName}
                </p>
                <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                  <span>
                    {(item.metadata?.fileSize || 0) / 1024 < 1024
                      ? `${Math.round((item.metadata?.fileSize || 0) / 1024)} KB`
                      : `${Math.round((item.metadata?.fileSize || 0) / 1024 / 1024)} MB`}
                  </span>
                  <span>
                    Uploaded by {item.uploadedBy}
                  </span>
                  <span>
                    {format(new Date(item.uploadedAt), 'MMM d, yyyy HH:mm')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={item.url}
                download
                className="p-2 text-gray-400 hover:text-gray-500"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </a>
              {onDelete && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        );
      })}
      {evidence.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No evidence uploaded
        </p>
      )}
    </div>
  );
}