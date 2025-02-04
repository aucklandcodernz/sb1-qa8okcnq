import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '../../lib/validations/employee';
import { toast } from 'react-hot-toast';
import { useAtom } from 'jotai';
import { organizationsAtom } from '../../atoms/organizationState';

interface Props {
  organizationId: string;
  onSuccess: () => void;
}

const onboardingTemplates = [
    { 
      id: 'standard',
      name: 'Standard Onboarding',
      duration: '2 weeks',
      tasks: [
        { title: 'Complete Personal Information', category: 'Documentation' },
        { title: 'Review Company Policies', category: 'Compliance' },
        { title: 'IT System Access Setup', category: 'Setup' },
        { title: 'Department Introduction', category: 'Integration' }
      ]
    },
    { 
      id: 'technical',
      name: 'Technical Role Onboarding',
      duration: '3 weeks',
      tasks: [
        { title: 'Complete Personal Information', category: 'Documentation' },
        { title: 'Technical Stack Overview', category: 'Training' },
        { title: 'Development Environment Setup', category: 'Setup' },
        { title: 'Code Repository Access', category: 'Setup' },
        { title: 'Team Project Introduction', category: 'Integration' }
      ]
    },
    { 
      id: 'management',
      name: 'Management Onboarding',
      duration: '4 weeks',
      tasks: [
        { title: 'Complete Personal Information', category: 'Documentation' },
        { title: 'Leadership Training', category: 'Training' },
        { title: 'Team Overview', category: 'Integration' },
        { title: 'KPI Review', category: 'Goals' },
        { title: 'Budget Overview', category: 'Training' }
      ]
    }
  ];

export default function CreateEmployeeForm({ organizationId, onSuccess }: Props) {
  const [organizations] = useAtom(organizationsAtom);
  const organization = organizations[organizationId];

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: '',
      onboardingTemplate: 'standard',
      startDate: '',
      organizationId
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const template = onboardingTemplates.find(t => t.id === data.onboardingTemplate);
      
      // Create employee with onboarding
      const response = await fetch('/api/employees/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          onboarding: {
            templateId: data.onboardingTemplate,
            startDate: data.startDate,
            totalTasks: template?.tasks.length || 0,
            currentPhase: 'DOCUMENTATION',
            tasks: template?.tasks.map(task => ({
              title: task.title,
              description: task.description || '',
              category: task.category,
              dueDate: new Date(data.startDate),
            }))
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create employee');
      }
      
      toast.success('Employee created successfully');
      onSuccess();
    } catch (error) {
      console.error('Create employee error:', error);
      toast.error(error.message || 'Failed to create employee');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Employee</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              {...register('position')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              {...register('department')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {organization?.departments?.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              {...register('startDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Onboarding Template</label>
            <select
              {...register('onboardingTemplate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {onboardingTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name} - {template.duration}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {onboardingTemplates.find(t => t.id === register('onboardingTemplate').value)?.description}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Employee
          </button>
        </div>
      </div>
    </form>
  );
}