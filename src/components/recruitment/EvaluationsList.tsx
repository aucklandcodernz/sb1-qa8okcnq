import React from 'react';
import { format } from 'date-fns';
import { ClipboardCheck, Star, User, Clock } from 'lucide-react';
import { CandidateEvaluation } from '../../types/evaluation';
import { cn } from '../../lib/utils';

interface EvaluationsListProps {
  evaluations: CandidateEvaluation[];
  onViewEvaluation: (evaluationId: string) => void;
}

const statusConfig = {
  DRAFT: {
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Draft',
  },
  SUBMITTED: {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Submitted',
  },
  REVIEWED: {
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Reviewed',
  },
};

const recommendationConfig = {
  STRONG_HIRE: {
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  HIRE: {
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  NO_HIRE: {
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
  STRONG_NO_HIRE: {
    color: 'text-red-900',
    bgColor: 'bg-red-200',
  },
};

export default function EvaluationsList({ evaluations, onViewEvaluation }: EvaluationsListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <ClipboardCheck className="h-5 w-5 mr-2 text-gray-400" />
          Candidate Evaluations
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {evaluations.map((evaluation) => {
              const status = statusConfig[evaluation.status];
              const recommendation = recommendationConfig[evaluation.recommendation];
              const averageRating = evaluation.ratings.reduce((sum, r) => sum + r.rating, 0) / evaluation.ratings.length;
              
              return (
                <li key={evaluation.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        status.bgColor
                      )}>
                        <ClipboardCheck className={cn('h-6 w-6', status.color)} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={cn(
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            status.bgColor,
                            status.color
                          )}>
                            {status.label}
                          </span>
                          <span className={cn(
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            recommendation.bgColor,
                            recommendation.color
                          )}>
                            {evaluation.recommendation.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                              key={rating}
                              className={cn(
                                'h-4 w-4',
                                rating <= averageRating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {evaluation.evaluatorRole.replace('_', ' ')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {format(new Date(evaluation.createdAt), 'MMM d, yyyy')}
                        </div>
                      </div>
                      {evaluation.overallComments && (
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                          {evaluation.overallComments}
                        </p>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => onViewEvaluation(evaluation.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
            {evaluations.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No evaluations found
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}