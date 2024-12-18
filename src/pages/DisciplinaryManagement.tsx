import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { disciplinaryCasesAtom } from '../lib/disciplinary';
import { userAtom } from '../lib/auth';
import DisciplinaryCaseList from '../components/disciplinary/DisciplinaryCaseList';
import CreateDisciplinaryForm from '../components/disciplinary/CreateDisciplinaryForm';
import DisciplinaryCaseDetails from '../components/disciplinary/DisciplinaryCaseDetails';
import AppealList from '../components/disciplinary/AppealList';

export default function DisciplinaryManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [user] = useAtom(userAtom);
  const [cases] = useAtom(disciplinaryCasesAtom);

  // Filter cases based on user role and permissions
  const filteredCases = cases.filter(case_ => {
    if (user?.role === 'SUPER_ADMIN') return true;
    if (!case_.accessRoles.includes(user?.role || '')) return false;
    if (['ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '')) {
      return case_.employeeId.startsWith(user?.organizationId || '');
    }
    if (user?.role === 'DEPT_MANAGER') {
      return case_.employeeId.startsWith(user?.departmentId || '');
    }
    return case_.employeeId === user?.id;
  });

  const selectedCase = selectedCaseId 
    ? filteredCases.find(c => c.id === selectedCaseId)
    : null;

  const canCreateCase = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');
  const appealsOnly = user?.role === 'EMPLOYEE';

  const handleCaseClick = (caseId: string) => {
    setSelectedCaseId(caseId);
    setShowCreateForm(false);
  };

  const handleCreateCase = (data: any) => {
    // Handle case creation
    setShowCreateForm(false);
  };

  const handleAddMeeting = (data: any) => {
    // Handle meeting creation
  };

  const handleAddEvidence = (data: any) => {
    // Handle evidence upload
  };

  const handleIssueWarning = (data: any) => {
    // Handle warning issuance
  };

  const handleResolveCase = (data: any) => {
    // Handle case resolution
  };

  const handleFileAppeal = (data: any) => {
    // Handle appeal filing
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Disciplinary Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            {appealsOnly 
              ? 'View and manage disciplinary appeals'
              : 'Manage disciplinary cases and appeals'}
          </p>
        </div>
        {canCreateCase && !appealsOnly && (
          <button
            onClick={() => {
              setShowCreateForm(true);
              setSelectedCaseId(null);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Case
          </button>
        )}
      </div>

      {showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <CreateDisciplinaryForm
            onSubmit={handleCreateCase}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      ) : selectedCase ? (
        <DisciplinaryCaseDetails
          case_={selectedCase}
          onClose={() => setSelectedCaseId(null)}
          onAddMeeting={handleAddMeeting}
          onAddEvidence={handleAddEvidence}
          onIssueWarning={handleIssueWarning}
          onResolveCase={handleResolveCase}
          onFileAppeal={handleFileAppeal}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appealsOnly ? (
            <div className="lg:col-span-2">
              <AppealList
                appeals={filteredCases.filter(c => c.appeal)}
                onAppealClick={handleCaseClick}
              />
            </div>
          ) : (
            <>
              <DisciplinaryCaseList
                cases={filteredCases}
                onCaseClick={handleCaseClick}
              />
              <AppealList
                appeals={filteredCases.filter(c => c.appeal)}
                onAppealClick={handleCaseClick}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}