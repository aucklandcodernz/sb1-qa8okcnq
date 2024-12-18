
import React from 'react';
import { useParams } from 'react-router-dom';

export default function OrganizationDetails() {
  const { id } = useParams();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organization Details</h1>
      <p>Organization ID: {id}</p>
    </div>
  );
}
