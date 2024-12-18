import React from 'react';
import { Bell, Calendar, Award, AlertCircle } from 'lucide-react';
import { TrainingCertificate } from '../../types/training';
import { format, addDays } from 'date-fns';
import { cn } from '../../lib/utils';

interface TrainingNotificationsProps {
  certificates: TrainingCertificate[];
  upcomingTraining?: {
    courseId: string;
    startDate: string;
    type: string;
  }[];
}

export default function TrainingNotifications({
  certificates,
  upcomingTraining = []
}: TrainingNotificationsProps) {
  const expiringCertificates = certificates.filter(cert => {
    if (!cert.expiryDate) return false;
    const daysUntilExpiry = Math.ceil(
      (new Date(cert.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  });

  if (expiringCertificates.length === 0 && upcomingTraining.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Bell className="h-5 w-5 mr-2 text-gray-400" />
          Training Notifications
        </h3>

        <div className="space-y-4">
          {expiringCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Certificate Expiring Soon
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Your certificate for {cert.courseId} will expire on {format(new Date(cert.expiryDate!), 'MMMM d, yyyy')}.</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        className="px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
                      >
                        Renew Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {upcomingTraining.map((training, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Upcoming Training
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      {training.courseId} - {training.type}
                      <br />
                      Starting on {format(new Date(training.startDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        className="px-3 py-2 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}