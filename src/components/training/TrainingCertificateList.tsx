import React from 'react';
import { format } from 'date-fns';
import { Award, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { TrainingCertificate } from '../../types/training';
import { cn } from '../../lib/utils';

interface TrainingCertificateListProps {
  certificates: TrainingCertificate[];
  onRenew?: (certificateId: string) => void;
}

export default function TrainingCertificateList({
  certificates,
  onRenew
}: TrainingCertificateListProps) {
  const sortedCertificates = [...certificates].sort(
    (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  );

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Award className="h-5 w-5 mr-2 text-gray-400" />
          Training Certificates
        </h3>

        <div className="space-y-4">
          {sortedCertificates.map((cert) => {
            const isExpired = cert.expiryDate && new Date(cert.expiryDate) < new Date();
            const expiresIn = cert.expiryDate 
              ? Math.ceil((new Date(cert.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              : null;

            return (
              <div
                key={cert.id}
                className={cn(
                  'p-4 rounded-lg border',
                  isExpired ? 'border-red-200 bg-red-50' : 'border-gray-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      isExpired ? 'bg-red-100' : 'bg-green-100'
                    )}>
                      {isExpired ? (
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      ) : (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{cert.courseId}</h4>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Issued: {format(new Date(cert.issueDate), 'MMM d, yyyy')}
                        </div>
                        {cert.expiryDate && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Expires: {format(new Date(cert.expiryDate), 'MMM d, yyyy')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Certificate
                    </a>
                    {isExpired && onRenew && (
                      <button
                        onClick={() => onRenew(cert.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Renew
                      </button>
                    )}
                  </div>
                </div>
                {expiresIn !== null && expiresIn <= 30 && !isExpired && (
                  <div className="mt-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                    <AlertCircle className="inline-block h-4 w-4 mr-1" />
                    Expires in {expiresIn} days
                  </div>
                )}
              </div>
            );
          })}
          {certificates.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No certificates found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}