import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { accidentReportsAtom } from '../../lib/safety/accidents';
import { userAtom } from '../../lib/auth';
import AccidentReportForm from '../../components/safety/AccidentReportForm';
import AccidentReportList from '../../components/safety/AccidentReportList';
import SafetyCertificateAlert from '../../components/safety/SafetyCertificateAlert';
import SafetyTrainingList from '../../components/safety/SafetyTrainingList';

export default function AccidentReports() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [accidentReports] = useAtom(accidentReportsAtom);

  const canCreateReport = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR'].includes(user?.role || '');

  const handleCreateReport = (data: any) => {
    // Handle report creation
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Accident Reports</h2>
          <p className="mt-1 text-sm text-gray-500">
            Record and manage workplace accidents and incidents
          </p>
        </div>
        {canCreateReport && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Report Accident
          </button>
        )}
      </div>

      {showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <AccidentReportForm
            employeeId={user?.id || ''}
            onSubmit={handleCreateReport}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AccidentReportList reports={accidentReports} />
          </div>
          <div className="space-y-6">
            <SafetyCertificateAlert
              certificate={{
                id: '1',
                employeeId: user?.id || '',
                type: 'FIRST_AID',
                status: 'EXPIRING_SOON',
                issueDate: '2023-06-01',
                expiryDate: '2024-06-01',
                provider: 'Red Cross',
                documents: [],
                reminders: [],
                createdAt: '',
                updatedAt: '',
                accessRoles: [],
              }}
            />
            <SafetyTrainingList trainings={[]} />
          </div>
        </div>
      )}
    </div>
  );
}