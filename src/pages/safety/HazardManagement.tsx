import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { hazardsAtom } from '../../lib/safety/hazards';
import { userAtom } from '../../lib/auth';
import HazardList from '../../components/safety/HazardList';
import CreateHazardForm from '../../components/safety/CreateHazardForm';
import HazardRiskMatrix from '../../components/safety/HazardRiskMatrix';
import SafetyStats from '../../components/safety/SafetyStats';

export default function HazardManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [hazards] = useAtom(hazardsAtom);

  const canCreateHazard = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR'].includes(user?.role || '');

  const handleCreateHazard = (data: any) => {
    // Handle hazard creation
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hazard Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Identify and manage workplace hazards and risks
          </p>
        </div>
        {canCreateHazard && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Report Hazard
          </button>
        )}
      </div>

      {showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <CreateHazardForm
            onSubmit={handleCreateHazard}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HazardList hazards={hazards} />
          </div>
          <div className="space-y-6">
            <SafetyStats />
            <HazardRiskMatrix />
          </div>
        </div>
      )}
    </div>
  );
}