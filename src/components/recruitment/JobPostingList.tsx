import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Briefcase, MapPin, DollarSign, Calendar } from 'lucide-react';
import { JobPosting } from '../../types/recruitment';
import { cn } from '../../lib/utils';

interface JobPostingListProps {
  jobPostings: JobPosting[];
}

const statusConfig = {
  DRAFT: { color: 'text-gray-500', bgColor: 'bg-gray-50', label: 'Draft' },
  PUBLISHED: { color: 'text-green-500', bgColor: 'bg-green-50', label: 'Published' },
  CLOSED: { color: 'text-red-500', bgColor: 'bg-red-50', label: 'Closed' },
  ON_HOLD: { color: 'text-yellow-500', bgColor: 'bg-yellow-50', label: 'On Hold' },
};

export default function JobPostingList({ jobPostings }: JobPostingListProps) {
  const navigate = useNavigate();
  const { id: organizationId } = useParams();

  const handleViewDetails = (jobId: string) => {
    navigate(`/organizations/${organizationId}/recruitment/jobs/${jobId}`);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
          Job Postings
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {jobPostings.map((job) => {
              const status = statusConfig[job.status];
              
              return (
                <li key={job.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{job.title}</p>
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          status.bgColor,
                          status.color
                        )}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        {job.salary && (
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                          </div>
                        )}
                        {job.closingDate && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Closes: {format(new Date(job.closingDate), 'MMM d, yyyy')}
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      {job.benefits.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {job.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => handleViewDetails(job.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
            {jobPostings.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No job postings found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}