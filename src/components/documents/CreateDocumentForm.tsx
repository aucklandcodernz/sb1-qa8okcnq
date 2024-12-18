import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { createDocument } from '../../lib/documents';
import { userAtom } from '../../lib/auth';
import { Role } from '../../types/auth';
import { DocumentType } from '../../types/documents';

const createDocumentSchema = z.object({
  type: z.enum(['CONTRACT', 'POLICY', 'FORM', 'REPORT', 'OTHER']),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  file: z.any().refine((file) => file?.length > 0, 'File is required'),
  tags: z.string().optional(),
  accessRoles: z.array(z.string()).min(1, 'At least one role must be selected'),
});

interface CreateDocumentFormProps {
  onSuccess: () => void;
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
  { value: 'SUPERVISOR', label: 'Supervisor' },
  { value: 'EMPLOYEE', label: 'Employee' },
  { value: 'STAKEHOLDER', label: 'Stakeholder' },
];

export default function CreateDocumentForm({ onSuccess }: CreateDocumentFormProps) {
  const [user] = useAtom(userAtom);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createDocumentSchema),
  });

  const onSubmit = async (data: any) => {
    if (!user?.organizationId) return;

    const tags = data.tags
      ? data.tags.split(',').map((tag: string) => tag.trim())
      : [];

    const formData = {
      type: data.type,
      title: data.title,
      description: data.description,
      file: data.file[0],
      tags,
      accessRoles: data.accessRoles,
    };

    await createDocument(user.organizationId, user.id, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          File
        </label>
        <input
          type="file"
          {...register('file')}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {errors.file && (
          <p className="mt-1 text-sm text-red-600">{errors.file.message}</p>
        )}
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

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Upload Document
        </button>
      </div>
    </form>
  );
}