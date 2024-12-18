import React, { useState } from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Clock, MapPin, User, Plus } from 'lucide-react';
import { Hazard } from '../../lib/safety/hazards';
import { cn } from '../../lib/utils';

interface HazardDetailsProps {
  hazard: Hazard;
  onClose: () => void;
  onUpdateStatus?: (status: Hazard['status']) => void;
  onAddControlMeasure?: (measure: string) => void;
}

const statusConfig = {
  IDENTIFIED: {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Identified',
  },
  ASSESSED: {
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Assessed',
  },
  CONTROLLED: {
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Controlled',
  },
  MONITORED: {
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

export default function HazardDetails({
  hazard,
  onClose,
  onUpdateStatus,
  onAddControlMeasure,
}: HazardDetailsProps) {
  const [newMeasure, setNewMeasure] = useState('');
  const status = statusConfig[hazard.status];

  const handleAddMeasure = () => {
    if (newMeasure.trim() && onAddControlMeasure) {
      onAddControlMeasure(newMeasure.trim());
      setNewMeasure('');
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className={cn(
              'h-10 w-10 rounded-lg flex items-center justify-center mr-4',
              status.bgColor
            )}>
              <AlertTriangle className={cn('h-6 w-6', status.color)} />
            </div>
            <div>
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
              <p className="mt-1 text-sm text-gray-500">
                {hazard.type.replace('_', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Description</h4>
            <p className="mt-2 text-sm text-gray-500">{hazard.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                Location
              </h4>
              <p className="mt-2 text-sm text-gray-500">{hazard.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                Reported By
              </h4>
              <p className="mt-2 text-sm text-gray-500">{hazard.reportedBy}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                Reported On
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                {format(new Date(hazard.reportedAt), 'MMM d, yyyy')}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                Review Date
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                {format(new Date(hazard.reviewDate), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900">Control Measures</h4>
            <ul className="mt-2 space-y-2">
              {hazard.controlMeasures.map((measure, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-500"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2" />
                  {measure}
                </li>
              ))}
            </ul>
            {onAddControlMeasure && (
              <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  value={newMeasure}
                  onChange={(e) => setNewMeasure(e.target.value)}
                  placeholder="Add new control measure"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  onClick={handleAddMeasure}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
            )}
          </div>

          {onUpdateStatus && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-end space-x-3">
                {hazard.status === 'IDENTIFIED' && (
                  <button
                    onClick={() => onUpdateStatus('ASSESSED')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Mark as Assessed
                  </button>
                )}
                {hazard.status === 'ASSESSED' && (
                  <button
                    onClick={() => onUpdateStatus('CONTROLLED')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Mark as Controlled
                  </button>
                )}
                {hazard.status === 'CONTROLLED' && (
                  <button
                    onClick={() => onUpdateStatus('MONITORED')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Move to Monitoring
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}