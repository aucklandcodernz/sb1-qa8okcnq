import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { visaDetailsAtom } from '../../lib/visa';
import { userAtom } from '../../lib/auth';
import VisaDetails from '../../components/employees/VisaDetails';
import CreateVisaForm from '../../components/employees/CreateVisaForm';
import VisaExpiryAlert from '../../components/employees/VisaExpiryAlert';
import WorkRightsAlert from '../../components/employees/WorkRightsAlert';

interface EmployeeVisaProps {
  employeeId: string;
}

export default function EmployeeVisa({ employeeId }: EmployeeVisaProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [visaDetails] = useAtom(visaDetailsAtom);

  const employeeVisa = visaDetails.find(
    visa => visa.employeeId === employeeId
  );

  const canManageVisa = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');

  const handleCreateVisa = (data: any) => {
    // Handle visa creation
    setShowCreateForm(false);
  };

  const handleVerifyVisa = (isVerified: boolean) => {
    // Handle visa verification
  };

  const handleUploadDocument = (file: File) => {
    // Handle document upload
  };

  return (
    <div className="space-y-6">
      {employeeVisa ? (
        <>
          <VisaExpiryAlert visa={employeeVisa} />
          <WorkRightsAlert issues={[]} />
          <VisaDetails
            visa={employeeVisa}
            onVerify={canManageVisa ? handleVerifyVisa : undefined}
            onUploadDocument={canManageVisa ? handleUploadDocument : undefined}
          />
        </>
      ) : canManageVisa ? (
        showCreateForm ? (
          <div className="bg-white shadow-sm rounded-lg p-6">
            <CreateVisaForm
              employeeId={employeeId}
              onSubmit={handleCreateVisa}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Add Visa Details
            </button>
          </div>
        )
      ) : (
        <div className="text-center py-12 text-gray-500">
          No visa details available
        </div>
      )}
    </div>
  );
}