
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2">
      <AlertTriangle className="h-5 w-5 text-red-500" />
      <p className="text-red-700">{message}</p>
    </div>
  );
}
