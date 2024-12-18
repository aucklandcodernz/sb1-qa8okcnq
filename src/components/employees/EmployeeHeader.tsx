import React from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';
import { format } from 'date-fns';

interface EmployeeHeaderProps {
  profile: EmployeeProfile;
}

export default function EmployeeHeader({ profile }: EmployeeHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <div className="h-24 w-24 rounded-full bg-indigo-50 flex items-center justify-center">
            <User className="h-12 w-12 text-indigo-500" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 truncate">
            {profile.position}
          </h2>
          <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {profile.email}
            </div>
            {profile.phoneNumber && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Phone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {profile.phoneNumber}
              </div>
            )}
            {profile.address && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {`${profile.address.street}, ${profile.address.city}, ${profile.address.state} ${profile.address.postalCode}`}
              </div>
            )}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              Joined {format(new Date(profile.startDate), 'MMMM d, yyyy')}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
            ${profile.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
              profile.status === 'ON_LEAVE' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'}`}>
            {profile.status}
          </span>
        </div>
      </div>
    </div>
  );
}