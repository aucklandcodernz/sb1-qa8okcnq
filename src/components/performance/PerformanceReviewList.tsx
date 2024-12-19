
import React from 'react';
import { format } from 'date-fns';
import { FileText, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useReviews } from '../../lib/query/reviewQueries';
import LoadingSpinner from '../ui/LoadingSpinner';
import Pagination from '../ui/Pagination';

export default function PerformanceReviewList() {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useReviews({ page, limit: 10 });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading reviews</div>;
  if (!data?.reviews.length) return <div>No reviews found</div>;

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {data.reviews.map((review) => (
          <div key={review.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{review.employee.firstName} {review.employee.lastName}</h3>
                <p className="text-sm text-gray-500">
                  Review date: {format(new Date(review.reviewDate), 'PP')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {review.status === 'COMPLETED' && <CheckCircle className="text-green-500" />}
                {review.status === 'PENDING' && <Clock className="text-yellow-500" />}
                {review.status === 'DRAFT' && <FileText className="text-gray-500" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Pagination 
        currentPage={page}
        totalPages={data.pagination.pages}
        onPageChange={setPage}
      />
    </div>
  );
}
