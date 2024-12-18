import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Calendar, User, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WarningPreviewProps {
  data: {
    type: string;
    details: string;
    expiryDate?: string;
    improvementPlan?: string;
    followUpDate?: string;
    acknowledgmentRequired?: boolean;
  };
  employeeDetails: {
    name: string;
    position: string;
    department: string;
  };
  issuerDetails: {
    name: string;
    position: string;
  };
}

export default function WarningPreview({
  data,
  employeeDetails,
  issuerDetails,
}: WarningPreviewProps) {
  const today = new Date();

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            {data.type.replace('_', ' ')}
          </h3>
          <div className="text-sm text-gray-500">
            Date: {format(today, 'MMMM d, yyyy')}
          </div>
        </div>

        <div className="space-y-6">
          {/* Employee Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              Employee Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>
                <span className="ml-2 text-gray-900">{employeeDetails.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Position:</span>
                <span className="ml-2 text-gray-900">{employeeDetails.position}</span>
              </div>
              <div>
                <span className="text-gray-500">Department:</span>
                <span className="ml-2 text-gray-900">{employeeDetails.department}</span>
              </div>
            </div>
          </div>

          {/* Warning Details */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
              <FileText className="h-4 w-4 mr-2 text-gray-400" />
              Warning Details
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {data.details}
              </p>
            </div>
          </div>

          {/* Improvement Plan */}
          {data.improvementPlan && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Required Improvements
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {data.improvementPlan}
                </p>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            {data.expiryDate && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  Warning Expiry
                </h4>
                <p className="text-sm text-gray-700">
                  {format(new Date(data.expiryDate), 'MMMM d, yyyy')}
                </p>
              </div>
            )}
            {data.followUpDate && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  Follow-up Date
                </h4>
                <p className="text-sm text-gray-700">
                  {format(new Date(data.followUpDate), 'MMMM d, yyyy')}
                </p>
              </div>
            )}
          </div>

          {/* Signatures */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Issued By:</h4>
                <div className="border-b border-gray-300 pb-2">
                  <p className="text-sm text-gray-700">{issuerDetails.name}</p>
                  <p className="text-xs text-gray-500">{issuerDetails.position}</p>
                  <p className="text-xs text-gray-500">
                    Date: {format(today, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              {data.acknowledgmentRequired && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Employee Acknowledgment:</h4>
                  <div className="border-b border-gray-300 pb-2">
                    <p className="text-xs text-gray-500 mb-4">
                      I acknowledge receipt of this warning and understand its contents.
                    </p>
                    <p className="text-sm text-gray-700">{employeeDetails.name}</p>
                    <p className="text-xs text-gray-500">Date: ________________</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}