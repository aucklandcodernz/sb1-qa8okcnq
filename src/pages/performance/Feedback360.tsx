import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { feedbackRequestsAtom } from '../../lib/feedback';
import { userAtom } from '../../lib/auth';
import FeedbackRequestForm from '../../components/performance/FeedbackRequestForm';
import FeedbackSummary from '../../components/performance/FeedbackSummary';

export default function Feedback360() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [feedbackRequests] = useAtom(feedbackRequestsAtom);

  const canRequestFeedback = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');

  return (
    <div className="space-y-6">
      {canRequestFeedback && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowRequestForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Request Feedback
          </button>
        </div>
      )}

      {showRequestForm ? (
        <FeedbackRequestForm 
          onSubmit={() => setShowRequestForm(false)}
          onCancel={() => setShowRequestForm(false)}
        />
      ) : (
        <div>
          {/* Feedback requests and summaries will go here */}
        </div>
      )}
    </div>
  );
}