import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { jobApplicationsAtom } from '../lib/recruitment';
import { ArrowLeft } from 'lucide-react';
import ApplicationTimeline from '../components/recruitment/ApplicationTimeline';
import InterviewScheduler from '../components/recruitment/InterviewScheduler';

export default function ApplicationDetails() {
  const { id: organizationId, applicationId } = useParams();
  const navigate = useNavigate();
  const [applications] = useAtom(jobApplicationsAtom);

  const application = applications.find(a => a.id === applicationId);

  if (!application) {
    return <Navigate to={`/organizations/${organizationId}/recruitment`} replace />;
  }

  const handleBack = () => {
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
          <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage application progress
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApplicationTimeline application={application} />
        </div>
        <div>
          <InterviewScheduler
            onSubmit={(data) => console.log('Schedule interview:', data)}
            onCancel={() => {}}
          />
        </div>
      </div>
    </div>
  );
}