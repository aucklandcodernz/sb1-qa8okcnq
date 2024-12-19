
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { documentStatusSchema } from '../../lib/validations/employee';
import FormField from '../ui/FormField';

export default function DocumentStatusManager({ employeeId }: { employeeId: string }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(documentStatusSchema)
  });

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documentStatus', employeeId],
    queryFn: async () => {
      const response = await fetch(`/api/employees/${employeeId}/documents`);
      if (!response.ok) throw new Error('Failed to fetch documents');
      return response.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/employees/${employeeId}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update document status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['documentStatus', employeeId]);
      reset();
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-4">
        <FormField
          label="Document Type"
          {...register('documentType')}
          error={errors.documentType?.message}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="EXPIRED">Expired</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <FormField
          label="Expiry Date"
          type="date"
          {...register('expiryDate')}
          error={errors.expiryDate?.message}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Document Status
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Document History</h3>
        <div className="mt-2 divide-y divide-gray-200">
          {documents?.map((doc: any) => (
            <div key={doc.id} className="py-4">
              <p className="text-sm font-medium text-gray-900">{doc.documentType}</p>
              <p className="text-sm text-gray-500">Status: {doc.status}</p>
              {doc.expiryDate && (
                <p className="text-sm text-gray-500">
                  Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
