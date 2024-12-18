import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { EmployeeProfile } from '../../types/employee';
import { cn } from '../../lib/utils';

interface EmployeeQualificationsProps {
  profile: EmployeeProfile;
  className?: string;
}

export default function EmployeeQualifications({
  profile,
  className,
}: EmployeeQualificationsProps) {
  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Qualifications & Skills
        </h3>

        <div className="space-y-6">
          {profile.qualifications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                Education
              </h4>
              <div className="space-y-4">
                {profile.qualifications.map((qual, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <p className="font-medium text-gray-900">{qual.degree}</p>
                    <p className="mt-1 text-sm text-gray-500">{qual.institution}</p>
                    <p className="mt-1 text-sm text-gray-500">Graduated {qual.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                <Award className="h-4 w-4 mr-2 text-gray-400" />
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.qualifications.length === 0 && profile.skills.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No qualifications or skills listed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}