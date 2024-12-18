import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { safetyTrainingsAtom } from '../../lib/safety/training';
import { userAtom } from '../../lib/auth';
import SafetyTrainingList from '../../components/safety/SafetyTrainingList';
import SafetyTrainingScheduler from '../../components/safety/SafetyTrainingScheduler';
import SafetyCertificateList from '../../components/safety/SafetyCertificateList';
import TrainingComplianceAlert from '../../components/safety/TrainingComplianceAlert';

export default function TrainingRecords() {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [trainings] = useAtom(safetyTrainingsAtom);

  const canScheduleTraining = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');

  const handleScheduleTraining = (data: any) => {
    // Handle training scheduling
    setShowScheduleForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Safety Training Records</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track safety training and certifications
          </p>
        </div>
        {canScheduleTraining && (
          <button
            onClick={() => setShowScheduleForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Schedule Training
          </button>
        )}
      </div>

      {showScheduleForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <SafetyTrainingScheduler
            onSubmit={handleScheduleTraining}
            onCancel={() => setShowScheduleForm(false)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SafetyTrainingList trainings={trainings} />
          </div>
          <div className="space-y-6">
            <TrainingComplianceAlert />
            <SafetyCertificateList certificates={[]} />
          </div>
        </div>
      )}
    </div>
  );
}