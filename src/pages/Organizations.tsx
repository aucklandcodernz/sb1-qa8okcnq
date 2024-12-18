
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import OrganizationList from '../components/organizations/OrganizationList';
import CreateOrganizationForm from '../components/organizations/CreateOrganizationForm';

export default function Organizations() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [organizations] = useState([
    { id: '1', name: 'Acme Corp', employeeCount: 150, location: 'Auckland' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Organization
        </button>
      </div>
      
      {showCreateForm ? (
        <CreateOrganizationForm onClose={() => setShowCreateForm(false)} />
      ) : (
        <OrganizationList organizations={organizations} />
      )}
    </div>
  );
}
