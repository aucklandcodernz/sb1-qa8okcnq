import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { performanceReviewsAtom } from '../../lib/performance';
import { reviewSchedulesAtom, createReviewSchedule } from '../../lib/performance/schedules';
import { userAtom } from '../../lib/auth';
import PerformanceReviewList from '../../components/performance/PerformanceReviewList';
import ReviewScheduleList from '../../components/performance/ReviewScheduleList';
import ReviewScheduleForm from '../../components/performance/ReviewScheduleForm';
import CreateReviewForm from '../../components/performance/CreateReviewForm';

export default function PerformanceReviews() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [reviews] = useAtom(performanceReviewsAtom);
  const [schedules] = useAtom(reviewSchedulesAtom);

  const canCreateReview = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');
  const canScheduleReviews = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');

  // Filter reviews based on user role and permissions
  const filteredReviews = reviews.filter(review => {
    if (user?.role === 'SUPER_ADMIN') return true;
    if (['ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '')) {
      return review.employeeId.startsWith(user?.organizationId || '');
    }
    if (user?.role === 'DEPT_MANAGER') {
      return review.employeeId.startsWith(user?.departmentId || '');
    }
    return review.employeeId === user?.id || review.reviewerId === user?.id;
  });

  // Filter schedules based on user role and permissions
  const filteredSchedules = schedules.filter(schedule => {
    if (user?.role === 'SUPER_ADMIN') return true;
    if (['ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '')) {
      return schedule.employeeId.startsWith(user?.organizationId || '');
    }
    if (user?.role === 'DEPT_MANAGER') {
      return schedule.employeeId.startsWith(user?.departmentId || '');
    }
    return schedule.employeeId === user?.id;
  });

  const handleCreateReview = (data: any) => {
    // Handle review creation
    setShowCreateForm(false);
  };

  const handleScheduleReview = (data: any) => {
    createReviewSchedule(data.employeeId, data.type, new Date(data.startDate));
    setShowScheduleForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Performance Reviews</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track employee performance reviews
          </p>
        </div>
        <div className="flex space-x-4">
          {canScheduleReviews && (
            <button
              onClick={() => setShowScheduleForm(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Schedule Review
            </button>
          )}
          {canCreateReview && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Create Review
            </button>
          )}
        </div>
      </div>

      {showScheduleForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <ReviewScheduleForm
            onSubmit={handleScheduleReview}
            onCancel={() => setShowScheduleForm(false)}
          />
        </div>
      ) : showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <CreateReviewForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ReviewScheduleList schedules={filteredSchedules} />
          </div>
          <div>
            <PerformanceReviewList reviews={filteredReviews} />
          </div>
        </div>
      )}
    </div>
  );
}