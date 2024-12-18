import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';
import { cn } from '../../lib/utils';

interface SignatureModalProps {
  onSign: (data: { signature: string; ipAddress?: string }) => void;
  onCancel: () => void;
  signatureType: 'employee' | 'employer';
}

export default function SignatureModal({
  onSign,
  onCancel,
  signatureType,
}: SignatureModalProps) {
  const [signature, setSignature] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature || !acknowledged) return;

    try {
      // Get IP address (in a real app, this would be from your server)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      onSign({ signature, ipAddress: ip });
    } catch (error) {
      // Fallback without IP if the service is unavailable
      onSign({ signature });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Digital Signature
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Please sign below to indicate your acceptance of the agreement
            </p>
          </div>

          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Important Notice
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    By signing this document, you acknowledge that:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>You have read and understood the agreement</li>
                    <li>Your signature is legally binding</li>
                    <li>This action cannot be undone</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <SignatureCanvas
            onChange={setSignature}
            className="border rounded-lg p-4"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I understand that this digital signature is legally binding
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!signature || !acknowledged}
              className={cn(
                'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white',
                signature && acknowledged
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-300 cursor-not-allowed'
              )}
            >
              Sign Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}