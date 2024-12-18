import React from 'react';
import { format } from 'date-fns';
import { FileText, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { PerformanceReview } from '../../types/performance';
import { cn } from '../../lib/utils';

interface PerformanceReviewListProps {
  reviews: PerformanceReview[];
}

const statusConfig = {
  DRAFT: {
    icon: Clock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'Draft',
  },
  PENDING: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Pending',
  },
  COMPLETED: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Completed',
  },
};

export default function PerformanceReviewList({ reviews }: PerformanceReviewListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Reviews</h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {reviews.map((review) => {
              const status = statusConfig[review.status];
              const StatusIcon = status.icon;
              
              return (
                <li key={review.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', status.bgColor)}>
                        <FileText className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {review.type} Review
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {format(new Date(review.period.startDate), 'MMM d')} -{' '}
                        {format(new Date(review.period.endDate), 'MMM d, yyyy')}
                      </div>
                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={cn(
                              'h-4 w-4',
                              index < review.overallRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        status.bgColor,
                        status.color
                      )}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  {review.comments && (
                    <div className="mt-2 text-sm text-gray-500 ml-14">
                      {review.comments}
                    </div>
                  )}
                </li>
              );
            })}
            {reviews.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No performance reviews found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}