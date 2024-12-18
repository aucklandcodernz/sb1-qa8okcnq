import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import OrganizationList from '../components/organizations/OrganizationList';
import CreateOrganizationForm from '../components/organizations/CreateOrganizationForm';
import PlanSelector from '../components/subscription/PlanSelector';

export default function Organizations() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [step, setStep] = useState<'plan' | 'details'>('plan');
  const [selectedPlan, setSelectedPlan] = useState<string>();
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep('details');
  };

  const handleCreateOrganization = () => {
    navigate('/register', { state: { plan: selectedPlan } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Organizations</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage all organizations in the system
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Organization
        </button>
      </div>

      {showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {step === 'plan' ? 'Select a Plan' : 'Create New Organization'}
            </h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>

          {step === 'plan' ? (
            <div className="space-y-6">
              <PlanSelector
                selectedPlan={selectedPlan}
                onSelectPlan={handlePlanSelect}
              />
            </div>
          ) : (
            <CreateOrganizationForm onSuccess={handleCreateOrganization} />
          )}
        </div>
      ) : (
        <OrganizationList />
      )}
    </div>
  );
}