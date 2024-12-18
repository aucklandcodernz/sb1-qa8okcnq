import React from 'react';
import { format } from 'date-fns';
import { BookOpen, Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { SafetyTraining } from '../../types/safety/training';
import { cn } from '../../lib/utils';

interface SafetyTrainingListProps {
  trainings: SafetyTraining[];
  onTrainingClick?: (trainingId: string) => void;
}

const statusConfig = {
  SCHEDULED: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Scheduled',
  },
  IN_PROGRESS: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'In Progress',
  },
  COMPLETED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
  CANCELLED: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: 'Cancelled',
  },
};

export default function SafetyTrainingList({
  trainings,
  onTrainingClick,
}: SafetyTrainingListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <BookOpen className="h-5 w-5 mr-2 text-gray-400" />
          Safety Training
        </h3>

        <div className="space-y-4">
          {trainings.map((training) => {
            const status = statusConfig[training.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={training.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50'
                )}
                onClick={() => onTrainingClick?.(training.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      status.bgColor
                    )}>
                      <StatusIcon className={cn('h-6 w-6', status.color)} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">
                          {training.type.replace('_', ' ')}
                        </h4>
                        <span className={cn(
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {training.status === 'COMPLETED'
                          ? `Completed on ${format(new Date(training.completedDate!), 'MMM d, yyyy')}`
                          : `Scheduled for ${format(new Date(training.scheduledDate), 'MMM d, yyyy')}`}
                      </div>
                      {training.location && (
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {training.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {training.instructor && (
                  <div className="mt-2 ml-14">
                    <p className="text-sm text-gray-500">
                      Instructor: {training.instructor.name}
                      {training.instructor.qualification && (
                        <span className="ml-1 text-xs">
                          ({training.instructor.qualification})
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {training.notes && (
                  <div className="mt-2 ml-14">
                    <p className="text-sm text-gray-500">{training.notes}</p>
                  </div>
                )}

                {training.certificate && (
                  <div className="mt-2 ml-14 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-500">
                      Certificate issued
                      {training.certificate.expiryDate && (
                        <> - Expires {format(new Date(training.certificate.expiryDate), 'MMM d, yyyy')}</>
                      )}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          {trainings.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No safety training found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}