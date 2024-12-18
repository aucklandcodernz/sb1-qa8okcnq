import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { 
  User, 
  Briefcase, 
  DollarSign, 
  Heart, 
  FileText, 
  Clock,
  Calendar,
  Shield,
  History
} from 'lucide-react';

import PersonalInfoForm from './forms/PersonalInfoForm';
import EmploymentDetailsForm from './forms/EmploymentDetailsForm';
import CompensationForm from './forms/CompensationForm';
import BenefitsEnrollmentForm from './forms/BenefitsEnrollmentForm';
import EmergencyContactForm from './forms/EmergencyContactForm';
import BankDetailsForm from './forms/BankDetailsForm';
import DocumentList from './documents/DocumentList';
import DocumentUploader from './documents/DocumentUploader';
import AuditTrail from './AuditTrail';
import { getEmployeeAuditTrail } from '../../lib/employee/audit';
import { getEmployeeDocuments } from '../../lib/documents/employee';

interface EmployeeProfileTabsProps {
  employeeId: string;
  departments: Array<{ id: string; name: string }>;
  managers: Array<{ id: string; name: string }>;
}

export default function EmployeeProfileTabs({
  employeeId,
  departments,
  managers,
}: EmployeeProfileTabsProps) {
  const [user] = useAtom(userAtom);
  const documents = getEmployeeDocuments(employeeId);
  const auditEntries = getEmployeeAuditTrail(employeeId);

  // Determine access levels based on user role
  const canEditPersonal = user?.id === employeeId || ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');
  const canEditEmployment = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');
  const canEditCompensation = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');
  const canEditBenefits = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');
  const canUploadDocuments = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');
  const canViewAudit = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: User,
      show: true,
    },
    {
      id: 'employment',
      label: 'Employment',
      icon: Briefcase,
      show: canEditEmployment || user?.id === employeeId,
    },
    {
      id: 'compensation',
      label: 'Compensation',
      icon: DollarSign,
      show: canEditCompensation,
    },
    {
      id: 'benefits',
      label: 'Benefits',
      icon: Shield,
      show: canEditBenefits || user?.id === employeeId,
    },
    {
      id: 'emergency',
      label: 'Emergency Contact',
      icon: Heart,
      show: true,
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      show: true,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Clock,
      show: true,
    },
    {
      id: 'leave',
      label: 'Leave',
      icon: Calendar,
      show: true,
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: History,
      show: canViewAudit,
    },
  ];

  const visibleTabs = tabs.filter(tab => tab.show);

  return (
    <Tabs defaultValue="personal">
      <TabsList>
        {visibleTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <TabsTrigger key={tab.id} value={tab.id}>
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div className="mt-6">
        <TabsContent value="personal">
          <PersonalInfoForm
            onSubmit={data => console.log('Personal info update:', data)}
            readOnly={!canEditPersonal}
          />
        </TabsContent>

        <TabsContent value="employment">
          <EmploymentDetailsForm
            onSubmit={data => console.log('Employment details update:', data)}
            departments={departments}
            managers={managers}
            readOnly={!canEditEmployment}
          />
        </TabsContent>

        <TabsContent value="compensation">
          <CompensationForm
            onSubmit={data => console.log('Compensation update:', data)}
            readOnly={!canEditCompensation}
          />
        </TabsContent>

        <TabsContent value="benefits">
          <BenefitsEnrollmentForm
            onSubmit={data => console.log('Benefits update:', data)}
            readOnly={!canEditBenefits}
          />
        </TabsContent>

        <TabsContent value="emergency">
          <EmergencyContactForm
            onSubmit={data => console.log('Emergency contact update:', data)}
            readOnly={!canEditPersonal}
          />
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-6">
            {canUploadDocuments && (
              <DocumentUploader
                onUpload={files => console.log('Document upload:', files)}
                maxFiles={5}
                maxSize={5 * 1024 * 1024} // 5MB
                acceptedTypes={['application/pdf', 'image/*', '.doc,.docx']}
              />
            )}
            <DocumentList
              documents={documents}
              onDelete={canUploadDocuments ? id => console.log('Delete document:', id) : undefined}
            />
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          {/* Add AttendanceHistory component */}
        </TabsContent>

        <TabsContent value="leave">
          {/* Add LeaveHistory component */}
        </TabsContent>

        {canViewAudit && (
          <TabsContent value="audit">
            <AuditTrail entries={auditEntries} />
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
}