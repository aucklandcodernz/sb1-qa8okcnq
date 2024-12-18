import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EvidenceUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  className?: string;
}

export default function EvidenceUploader({
  onUpload,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/*', 'application/pdf', '.doc,.docx,.xls,.xlsx'],
  className,
}: EvidenceUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400'
        )}
      >
        <input {...getInputProps()} />
        <Upload className={cn(
          'mx-auto h-12 w-12 mb-4',
          isDragActive ? 'text-indigo-500' : 'text-gray-400'
        )} />
        <p className="text-sm text-gray-600">
          {isDragActive ? (
            'Drop the files here...'
          ) : (
            <>
              Drag and drop files here, or click to select files
              <br />
              <span className="text-xs text-gray-500">
                Supported formats: Images, PDF, Word, Excel (max {maxSize / 1024 / 1024}MB)
              </span>
            </>
          )}
        </p>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-2">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="flex items-center text-sm text-red-500">
              <X className="h-4 w-4 mr-1" />
              {file.name} - {errors[0].message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}