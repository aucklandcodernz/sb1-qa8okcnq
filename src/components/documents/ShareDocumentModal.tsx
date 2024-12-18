import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Share2, Mail, Link, Clock } from 'lucide-react';

const shareDocumentSchema = z.object({
  recipients: z.string().min(1, 'At least one recipient is required'),
  message: z.string().optional(),
  expiryDays: z.number().min(1).max(30).optional(),
  allowDownload: z.boolean().optional(),
});

interface ShareDocumentModalProps {
  documentTitle: string;
  onClose: () => void;
  onShare: (data: any) => void;
}

export default function ShareDocumentModal({
  documentTitle,
  onClose,
  onShare,
}: ShareDocumentModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shareDocumentSchema),
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-gray-400" />
            Share Document
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Share "{documentTitle}" with others
        </p>

        <form onSubmit={handleSubmit(onShare)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipients (comma-separated emails)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                {...register('recipients')}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="email@example.com, email2@example.com"
              />
            </div>
            {errors.recipients && (
              <p className="mt-1 text-sm text-red-600">{errors.recipients.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message (optional)
            </label>
            <textarea
              {...register('message')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add a message to the recipients..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Link Expiry (days)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  {...register('expiryDays')}
                  min="1"
                  max="30"
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="7"
                />
              </div>
            </div>

            <div className="flex items-center h-full">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('allowDownload')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 block text-sm text-gray-700">
                  Allow download
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Link className="h-4 w-4 mr-2" />
              Generate Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}