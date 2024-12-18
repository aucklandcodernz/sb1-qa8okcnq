
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { employeeProfilesAtom } from '../../lib/employees';
import EmployeeDocumentsComponent from '../../components/employees/EmployeeDocuments';

export default function EmployeeDocuments() {
  const { id } = useParams();
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const profile = employeeProfiles[id || ''];

  if (!profile) {
    return <div>Employee not found</div>;
  }

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
