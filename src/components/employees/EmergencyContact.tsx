import React from 'react';
import { Phone, Mail, Heart } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';

interface EmergencyContactProps {
  contact: NonNullable<EmployeeProfile['emergencyContact']>;
}

export default function EmergencyContact({ contact }: EmergencyContactProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm text-gray-500">Name</dt>
          <dd className="font-medium">{contact.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Relationship</dt>
          <dd className="font-medium">{contact.relationship}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Phone</dt>
          <dd className="font-medium">{contact.phoneNumber}</dd>
        </div>
        {contact.email && (
          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-medium">{contact.email}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}