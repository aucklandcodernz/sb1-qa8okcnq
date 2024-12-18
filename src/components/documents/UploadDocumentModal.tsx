import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload } from 'lucide-react';
import FileUploader from './FileUploader';
import { uploadFile, UploadedFile } from '../../lib/documents/upload';
import { DocumentType } from '../../types/documents';
import { Role } from '../../types/auth';

const uploadDocumentSchema = z.object({
  type: z.enum(['CONTRACT', 'POLICY', 'FORM', 'REPORT', 'OTHER']),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  tags: z.string().optional(),
  accessRoles: z.array(z.string()).min(1, 'At least one role must be selected'),
});

interface UploadDocumentModalProps {
  onUpload: (data: any) => void;
  onClose: () => void;
}

const documentTypes: { value: DocumentType; label: string }[] = [
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'POLICY', label: 'Policy' },
  { value: 'FORM', label: 'Form' },
  { value: 'REPORT', label: 'Report' },
  { value: 'OTHER', label: 'Other' },
];

const roles: { value: Role; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ORG_ADMIN', label: 'Organization Admin' },
  { value: 'HR_MANAGER', label: 'HR Manager' },
  { value: 'DEPT_MANAGER', label: 'Department Manager' },
  { value: 'EMPLOYEE', label: 'Employee' },
];

export default function UploadDocumentModal({
  onUpload,
  onClose,
}: UploadDocumentModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      accessRoles: ['EMPLOYEE'],
    },
  });

  const handleFileUpload = async (files: File[]) => {
    const uploaded = await Promise.all(files.map(file => uploadFile(file)));
    setUploadedFiles([...uploadedFiles, ...uploaded]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    if (uploadedFiles.length === 0) return;

    const formData = {
      ...data,
      files: uploadedFiles,
      tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
    };

    onUpload(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Upload className="h-5 w-5 mr-2 text-gray-400" />
            Upload Document
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FileUploader
            onUpload={handleFileUpload}
            uploadedFiles={uploadedFiles.map(f => ({ name: f.name, size: f.size }))}
            onRemoveFile={handleRemoveFile}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Document Type
            </label>
            <select
              {...register('type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select document type</option>
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              {...register('tags')}
              placeholder="policy, handbook, 2024"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Access Roles
            </label>
            <div className="mt-2 space-y-2">
              {roles.map((role) => (
                <div key={role.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={role.value}
                    {...register('accessRoles')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    {role.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.accessRoles && (
              <p className="mt-1 text-sm text-red-600">{errors.accessRoles.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadedFiles.length === 0}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}