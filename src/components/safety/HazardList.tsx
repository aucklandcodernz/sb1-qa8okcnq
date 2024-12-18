import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Hazard } from '../../lib/safety/hazards';
import { cn } from '../../lib/utils';

interface HazardListProps {
  hazards: Hazard[];
  onHazardClick?: (hazardId: string) => void;
}

const statusConfig = {
  IDENTIFIED: {
    icon: AlertTriangle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Identified',
  },
  ASSESSED: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Assessed',
  },
  CONTROLLED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Controlled',
  },
  MONITORED: {
    icon: Clock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    label: 'Monitored',
  },
};

const riskLevelColors = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  CRITICAL: 'bg-red-100 text-red-800',
};

export default function HazardList({ hazards, onHazardClick }: HazardListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
          Hazard Register
        </h3>

        <div className="space-y-4">
          {hazards.map((hazard) => {
            const status = statusConfig[hazard.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={hazard.id}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-colors',
                  'hover:bg-gray-50'
                )}
                onClick={() => onHazardClick?.(hazard.id)}
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
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2',
                          riskLevelColors[hazard.riskLevel]
                        )}>
                          {hazard.riskLevel}
                        </span>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-900">
                        {hazard.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>Location: {hazard.location}</span>
                        <span>
                          Reported: {format(new Date(hazard.reportedAt), 'MMM d, yyyy')}
                        </span>
                        <span>
                          Review: {format(new Date(hazard.reviewDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {hazard.controlMeasures.length > 0 && (
                  <div className="mt-2 ml-14">
                    <p className="text-sm text-gray-500">
                      Control Measures:
                      {hazard.controlMeasures.map((measure, index) => (
                        <span key={index} className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {measure}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          {hazards.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No hazards reported
            </p>
          )}
        </div>
      </div>
    </div>
  );
}