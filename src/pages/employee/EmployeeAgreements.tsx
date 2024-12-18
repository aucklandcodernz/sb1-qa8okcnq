import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { agreementsAtom } from '../../lib/agreements';
import { userAtom } from '../../lib/auth';
import AgreementList from '../../components/agreements/AgreementList';
import CreateAgreementForm from '../../components/agreements/CreateAgreementForm';
import AgreementDetails from '../../components/agreements/AgreementDetails';

interface EmployeeAgreementsProps {
  employeeId: string;
}

export default function EmployeeAgreements({ employeeId }: EmployeeAgreementsProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAgreementId, setSelectedAgreementId] = useState<string | null>(null);
  const [user] = useAtom(userAtom);
  const [agreements] = useAtom(agreementsAtom);

  const employeeAgreements = agreements.filter(
    agreement => agreement.employeeId === employeeId
  );

  const canCreateAgreement = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');

  const handleCreateAgreement = (data: any) => {
    // Handle agreement creation
    setShowCreateForm(false);
  };

  const handleAgreementClick = (agreementId: string) => {
    setSelectedAgreementId(agreementId);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Employment Agreements</h3>
        {canCreateAgreement && (
          <button
            onClick={() => {
              setShowCreateForm(true);
              setSelectedAgreementId(null);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Agreement
          </button>
        )}
      </div>

      {showCreateForm ? (
        <CreateAgreementForm
          onSubmit={handleCreateAgreement}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : selectedAgreementId ? (
        <AgreementDetails
          agreement={employeeAgreements.find(a => a.id === selectedAgreementId)!}
          onClose={() => setSelectedAgreementId(null)}
        />
      ) : (
        <AgreementList
          agreements={employeeAgreements}
          onAgreementClick={handleAgreementClick}
        />
      )}
    </div>
  );
}