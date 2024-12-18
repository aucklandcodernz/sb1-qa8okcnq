import React from 'react';
import { useAtom } from 'jotai';
import { AlertTriangle } from 'lucide-react';
import { accidentReportsAtom } from '../../lib/safety/accidents';
import { hazardsAtom } from '../../lib/safety/hazards';
import { safetyTrainingsAtom } from '../../lib/safety/training';
import { cn } from '../../lib/utils';
import SafetyStats from '../../components/safety/SafetyStats';
import SafetyTrainingList from '../../components/safety/SafetyTrainingList';
import HazardRiskMatrix from '../../components/safety/HazardRiskMatrix';
import TrainingComplianceAlert from '../../components/safety/TrainingComplianceAlert';

export default function SafetyDashboard() {
  const [accidentReports] = useAtom(accidentReportsAtom);
  const [hazards] = useAtom(hazardsAtom);
  const [trainings] = useAtom(safetyTrainingsAtom);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SafetyStats />
          
          {/* Recent Incidents */}
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
                Recent Incidents
              </h3>
              <div className="space-y-4">
                {accidentReports.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {incident.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(incident.date).toLocaleDateString()} - {incident.location}
                      </p>
                    </div>
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      incident.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'SERIOUS' ? 'bg-orange-100 text-orange-800' :
                      incident.severity === 'MODERATE' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    )}>
                      {incident.severity}
                    </span>
                  </div>
                ))}
                {accidentReports.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No recent incidents reported
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <TrainingComplianceAlert />
          <SafetyTrainingList trainings={trainings} />
          <HazardRiskMatrix />
        </div>
      </div>
    </div>
  );
}