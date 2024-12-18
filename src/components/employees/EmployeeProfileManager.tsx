import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { userAtom } from '../../lib/auth';
import { employeeProfilesAtom } from '../../lib/employees';
import { employeeDocumentsAtom } from '../../lib/documents/employee';

import PersonalInfoForm from './forms/PersonalInfoForm';
import EmploymentDetailsForm from './forms/EmploymentDetailsForm';
import CompensationForm from './forms/CompensationForm';
import BenefitsEnrollmentForm from './forms/BenefitsEnrollmentForm';
import EmergencyContactForm from './forms/EmergencyContactForm';
import BankDetailsForm from './forms/BankDetailsForm';
import DocumentUploader from './documents/DocumentUploader';
import DocumentList from './documents/DocumentList';

interface EmployeeProfileManagerProps {
  employeeId: string;
  departments: Array<{ id: string; name: string }>;
  managers: Array<{ id: string; name: string }>;
}

export default function EmployeeProfileManager({
  employeeId,
  departments,
  managers,
}: EmployeeProfileManagerProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [currentUser] = useAtom(userAtom);
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const [employeeDocuments] = useAtom(employeeDocumentsAtom);

  const profile = employeeProfiles[employeeId];
  const documents = employeeDocuments.filter(doc => doc.employeeId === employeeId);

  const canEdit = currentUser?.role === 'SUPER_ADMIN' ||
    (currentUser?.organizationId === profile?.organizationId &&
      ['ORG_ADMIN', 'HR_MANAGER'].includes(currentUser?.role || ''));

  const handlePersonalInfoSubmit = (data: any) => {
    // Handle personal info update
    console.log('Personal info update:', data);
  };

  const handleEmploymentDetailsSubmit = (data: any) => {
    // Handle employment details update
    console.log('Employment details update:', data);
  };

  const handleCompensationSubmit = (data: any) => {
    // Handle compensation update
    console.log('Compensation update:', data);
  };

  const handleBenefitsSubmit = (data: any) => {
    // Handle benefits update
    console.log('Benefits update:', data);
  };

  const handleEmergencyContactSubmit = (data: any) => {
    // Handle emergency contact update
    console.log('Emergency contact update:', data);
  };

  const handleBankDetailsSubmit = (data: any) => {
    // Handle bank details update
    console.log('Bank details update:', data);
  };

  const handleDocumentUpload = async (files: File[]) => {
    // Handle document upload
    console.log('Document upload:', files);
  };

  const handleDocumentDelete = (documentId: string) => {
    // Handle document deletion
    console.log('Document delete:', documentId);
  };

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Employee profile not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="personal">
            <PersonalInfoForm
              onSubmit={handlePersonalInfoSubmit}
              defaultValues={profile}
            />
          </TabsContent>

          <TabsContent value="employment">
            <EmploymentDetailsForm
              onSubmit={handleEmploymentDetailsSubmit}
              defaultValues={profile}
              departments={departments}
              managers={managers}
            />
          </TabsContent>

          <TabsContent value="compensation">
            <CompensationForm
              onSubmit={handleCompensationSubmit}
              defaultValues={profile}
            />
          </TabsContent>

          <TabsContent value="benefits">
            <BenefitsEnrollmentForm
              onSubmit={handleBenefitsSubmit}
              defaultValues={profile}
              availablePlans={{
                health: [],
                life: [],
                retirement: [],
              }}
            />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyContactForm
              onSubmit={handleEmergencyContactSubmit}
              defaultValues={profile.emergencyContact}
            />
          </TabsContent>

          <TabsContent value="bank">
            <BankDetailsForm
              onSubmit={handleBankDetailsSubmit}
              defaultValues={profile.bankDetails}
            />
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
              {canEdit && (
                <DocumentUploader
                  onUpload={handleDocumentUpload}
                  maxFiles={5}
                  maxSize={5 * 1024 * 1024} // 5MB
                  acceptedTypes={['application/pdf', 'image/*', '.doc,.docx']}
                />
              )}
              <DocumentList
                documents={documents}
                onDelete={canEdit ? handleDocumentDelete : undefined}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}