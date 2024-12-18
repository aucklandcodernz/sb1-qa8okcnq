import React from 'react';
import { Phone, Mail, Heart } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';

interface EmergencyContactProps {
  contact: NonNullable<EmployeeProfile['emergencyContact']>;
}

export default function EmergencyContact({ contact }: EmergencyContactProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <Heart className="h-5 w-5 mr-2 text-red-500" />
        Emergency Contact
      </h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500 w-32">Name:</span>
          <span className="text-sm text-gray-900">{contact.name}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500 w-32">Relationship:</span>
          <span className="text-sm text-gray-900">{contact.relationship}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500 w-32">Phone:</span>
          <div className="flex items-center text-sm text-gray-900">
            <Phone className="h-4 w-4 mr-1 text-gray-400" />
            {contact.phoneNumber}
          </div>
        </div>
        {contact.email && (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 w-32">Email:</span>
            <div className="flex items-center text-sm text-gray-900">
              <Mail className="h-4 w-4 mr-1 text-gray-400" />
              {contact.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}