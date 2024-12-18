import React from 'react';
import { useAtom } from 'jotai';
import { jobApplicationsAtom } from '../../lib/recruitment';
import { userAtom } from '../../lib/auth';
import ApplicationsList from '../../components/recruitment/ApplicationsList';

interface ApplicationsProps {
  organizationId: string;
}

export default function Applications({ organizationId }: ApplicationsProps) {
  const [applications] = useAtom(jobApplicationsAtom);
  const [user] = useAtom(userAtom);

  const filteredApplications = user?.role === 'SUPER_ADMIN'
    ? applications
    : applications.filter(app => {
        const job = jobPostingsAtom.init.find(j => j.id === app.jobId);
        return job?.organizationId === organizationId;
      });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Applications</h3>
      <ApplicationsList applications={filteredApplications} />
    </div>
  );
}