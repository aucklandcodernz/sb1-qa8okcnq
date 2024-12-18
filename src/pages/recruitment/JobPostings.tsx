import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { jobPostingsAtom } from '../../lib/recruitment';
import { userAtom } from '../../lib/auth';
import JobPostingList from '../../components/recruitment/JobPostingList';
import CreateJobPostingForm from '../../components/recruitment/CreateJobPostingForm';
import JobFilters from '../../components/recruitment/JobFilters';

interface JobPostingsProps {
  organizationId: string;
}

export default function JobPostings({ organizationId }: JobPostingsProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [jobPostings] = useAtom(jobPostingsAtom);

  const canCreateJob = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');
  const filteredJobPostings = user?.role === 'SUPER_ADMIN' 
    ? jobPostings 
    : jobPostings.filter(job => job.organizationId === organizationId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Job Postings</h3>
        {canCreateJob && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Post New Job
          </button>
        )}
      </div>

      {showCreateForm ? (
        <div className="bg-white rounded-lg">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Create Job Posting</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <CreateJobPostingForm 
            organizationId={organizationId} 
            onSuccess={() => setShowCreateForm(false)} 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <JobFilters onFilter={() => {}} />
          </div>
          <div className="lg:col-span-3">
            <JobPostingList jobPostings={filteredJobPostings} />
          </div>
        </div>
      )}
    </div>
  );
}