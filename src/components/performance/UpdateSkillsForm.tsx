import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { skillAssessmentsAtom } from '../../lib/performance';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const skillSchema = z.object({
  skills: z.array(z.object({
    name: z.string(),
    category: z.string(),
    proficiency: z.number().min(1).max(5),
  })),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    dateObtained: z.string(),
    expiryDate: z.string().optional(),
  })).optional(),
});

interface UpdateSkillsFormProps {
  employeeId: string;
  onSuccess: () => void;
}

export default function UpdateSkillsForm({ employeeId, onSuccess }: UpdateSkillsFormProps) {
  const [skillAssessments, setSkillAssessments] = useAtom(skillAssessmentsAtom);
  
  const assessment = skillAssessments.find(a => a.employeeId === employeeId);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: assessment?.skills || [],
      certifications: assessment?.certifications || [],
    },
  });

  const onSubmit = (data: any) => {
    const updatedSkills = data.skills.map((skill: any) => ({
      ...skill,
      lastUpdated: new Date().toISOString(),
    }));

    const updatedCertifications = data.certifications?.map((cert: any) => ({
      ...cert,
      status: new Date(cert.expiryDate) > new Date() ? 'ACTIVE' : 'EXPIRED',
    }));

    if (assessment) {
      setSkillAssessments(assessments =>
        assessments.map(a =>
          a.employeeId === employeeId
            ? { 
                ...a, 
                skills: updatedSkills,
                certifications: updatedCertifications || a.certifications,
              }
            : a
        )
      );
    } else {
      setSkillAssessments([
        ...skillAssessments,
        {
          id: Math.random().toString(36).substr(2, 9),
          employeeId,
          skills: updatedSkills,
          certifications: updatedCertifications || [],
        },
      ]);
    }

    onSuccess();
  };

  const watchSkills = watch('skills');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h4 className="text-sm font-medium text-gray-900">Skills Assessment</h4>
        {assessment?.skills.map((skill, index) => (
          <div key={skill.name} className="space-y-4">
            <input type="hidden" {...register(`skills.${index}.name`)} value={skill.name} />
            <input type="hidden" {...register(`skills.${index}.category`)} value={skill.category} />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                <p className="text-xs text-gray-500">{skill.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="cursor-pointer">
                    <input
                      type="radio"
                      {...register(`skills.${index}.proficiency`)}
                      value={rating}
                      className="sr-only"
                    />
                    <Star
                      className={cn(
                        'h-6 w-6 transition-colors',
                        Number(watchSkills[index]?.proficiency) >= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      )}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-medium text-gray-900">Certifications</h4>
        {assessment?.certifications.map((cert, index) => (
          <div key={cert.name} className="space-y-4 border-b border-gray-200 pb-4">
            <input type="hidden" {...register(`certifications.${index}.name`)} value={cert.name} />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issuer
                </label>
                <input
                  type="text"
                  {...register(`certifications.${index}.issuer`)}
                  defaultValue={cert.issuer}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date Obtained
                </label>
                <input
                  type="date"
                  {...register(`certifications.${index}.dateObtained`)}
                  defaultValue={cert.dateObtained.split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date (if applicable)
              </label>
              <input
                type="date"
                {...register(`certifications.${index}.expiryDate`)}
                defaultValue={cert.expiryDate?.split('T')[0]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Skills & Certifications
        </button>
      </div>
    </form>
  );
}