import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { jobPostingsAtom } from '../lib/recruitment';
import { ArrowLeft } from 'lucide-react';
import JobApplicationForm from '../components/recruitment/JobApplicationForm';

export default function JobDetails() {
  const { id: organizationId, jobId } = useParams();
  const navigate = useNavigate();
  const [jobPostings] = useAtom(jobPostingsAtom);

  const job = jobPostings.find(j => j.id === jobId);

  if (!job) {
    return <Navigate to={`/organizations/${organizationId}/recruitment`} replace />;
  }

  const handleBack = () => {
    navigate(`/organizations/${organizationId}/recruitment`);
  };

  const handleApply = (data: any) => {
    // Handle job application submission
    console.log('Application submitted:', data);
    navigate(`/organizations/${organizationId}/recruitment`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={handleBack}
          className="mr-4 p-2 text-gray-400 hover:text-gray-500"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            View job details and submit application
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {/* Job details content */}
          <div className="prose max-w-none">
            <h3>Description</h3>
            <p>{job.description}</p>

            <h3>Requirements</h3>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>

            <h3>Responsibilities</h3>
            <ul>
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>

            {job.benefits.length > 0 && (
              <>
                <h3>Benefits</h3>
                <ul>
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Apply for this Position</h3>
          <JobApplicationForm
            jobId={jobId}
            onSubmit={handleApply}
            onCancel={handleBack}
          />
        </div>
      </div>
    </div>
  );
}