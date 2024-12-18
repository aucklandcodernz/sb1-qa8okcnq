import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { Award, Star, GraduationCap, Clock, Plus } from 'lucide-react';
import { skillAssessmentsAtom } from '../../lib/performance';
import { cn } from '../../lib/utils';

interface SkillsMatrixProps {
  employeeId?: string;
}

export default function SkillsMatrix({ employeeId }: SkillsMatrixProps) {
  const [skillAssessments] = useAtom(skillAssessmentsAtom);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (!employeeId) return null;

  const assessment = skillAssessments.find(
    assessment => assessment.employeeId === employeeId
  );

  if (!assessment) return null;

  const skillCategories = Array.from(
    new Set(assessment.skills.map(skill => skill.category))
  );

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Award className="h-5 w-5 mr-2 text-gray-400" />
            Skills & Certifications
          </h3>
          <button
            onClick={() => setShowUpdateForm(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Update Skills
          </button>
        </div>

        <div className="space-y-6">
          {skillCategories.map(category => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                {category}
              </h4>
              <div className="space-y-4">
                {assessment.skills
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                        <p className="text-xs text-gray-500">
                          Last updated: {format(new Date(skill.lastUpdated), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={cn(
                              'h-4 w-4',
                              index < skill.proficiency
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {assessment.certifications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                Certifications
              </h4>
              <div className="space-y-4">
                {assessment.certifications.map(cert => (
                  <div key={cert.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                      <p className="text-xs text-gray-500">
                        Issued by {cert.issuer} on{' '}
                        {format(new Date(cert.dateObtained), 'MMM d, yyyy')}
                      </p>
                      {cert.expiryDate && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Expires: {format(new Date(cert.expiryDate), 'MMM d, yyyy')}
                        </div>
                      )}
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        cert.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      )}
                    >
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}