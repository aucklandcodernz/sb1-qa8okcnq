import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  className?: string;
  uploadedFiles?: { name: string; size: number }[];
  onRemoveFile?: (index: number) => void;
}

export default function FileUploader({
  onUpload,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/*', 'application/pdf', '.doc,.docx,.xls,.xlsx'],
  className,
  uploadedFiles = [],
  onRemoveFile,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: maxFiles - uploadedFiles.length,
    maxSize,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files</h4>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <File className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}