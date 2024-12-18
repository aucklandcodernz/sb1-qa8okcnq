import React from 'react';
import { EmployeeProfile } from '../../types/employee';
import EmployeeDocumentsComponent from '../../components/employees/EmployeeDocuments';

interface EmployeeDocumentsProps {
  profile: EmployeeProfile;
}

export default function EmployeeDocuments({ profile }: EmployeeDocumentsProps) {
  const handleUpload = async (file: File) => {
    // Implement document upload logic
    console.log('Uploading document:', file.name);
  };

  return (
    <div className="space-y-6">
      <EmployeeDocumentsComponent 
        profile={profile}
        onUpload={handleUpload}
      />
    </div>
  );
}