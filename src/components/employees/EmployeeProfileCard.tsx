import React from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface EmployeeProfileCardProps {
  profile: EmployeeProfile;
  className?: string;
}

export default function EmployeeProfileCard({
  profile,
  className,
}: EmployeeProfileCardProps) {
  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-medium text-gray-900">
              {profile.position}
            </h3>
            <div className="mt-1 space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                {profile.email}
              </div>
              {profile.phoneNumber && (
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {profile.phoneNumber}
                </div>
              )}
              {profile.address && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {profile.address}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Started {format(new Date(profile.startDate), 'MMMM d, yyyy')}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Employment Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.employmentType}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">{profile.status}</dd>
            </div>
            {profile.emergencyContact && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {profile.emergencyContact.name} ({profile.emergencyContact.relationship})
                  <br />
                  {profile.emergencyContact.phoneNumber}
                  {profile.emergencyContact.email && (
                    <>
                      <br />
                      {profile.emergencyContact.email}
                    </>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}