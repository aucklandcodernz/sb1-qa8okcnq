
import React from 'react';
import OrganizationList from '../components/organizations/OrganizationList';
import CreateOrganizationForm from '../components/organizations/CreateOrganizationForm';

export default function Organizations() {
  return (
    <div className="space-y-6 p-6">
      <CreateOrganizationForm />
      <OrganizationList />
    </div>
  );
}
