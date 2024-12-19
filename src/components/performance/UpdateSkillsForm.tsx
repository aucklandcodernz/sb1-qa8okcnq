
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillAssessmentSchema } from '../../lib/validations/employee';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/user';
import FormField from '../ui/FormField';

export default function UpdateSkillsForm({ employeeId, onSuccess }: { employeeId: string; onSuccess?: () => void }) {
  const [currentUser] = useAtom(userAtom);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(skillAssessmentSchema),
    defaultValues: {
      skillName: '',
      level: 1,
      notes: '',
      reason: '',
      assessedBy: currentUser?.id || ''
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/employees/${employeeId}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update skill');
      }

      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Skill Name"
        {...register('skillName')}
        error={errors.skillName?.message}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Skill Level</label>
        <select
          {...register('level', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {[1, 2, 3, 4, 5].map(level => (
            <option key={level} value={level}>Level {level}</option>
          ))}
        </select>
        {errors.level && (
          <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
        )}
      </div>

      <FormField
        label="Notes"
        {...register('notes')}
        error={errors.notes?.message}
      />

      <FormField
        label="Reason for Change"
        {...register('reason')}
        error={errors.reason?.message}
      />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Skill
      </button>
    </form>
  );
}
