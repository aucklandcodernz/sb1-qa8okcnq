import React from 'react';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { FeedbackSummary as FeedbackSummaryType } from '../../types/feedback';
import { cn } from '../../lib/utils';

interface FeedbackSummaryProps {
  summary: FeedbackSummaryType;
}

export default function FeedbackSummary({ summary }: FeedbackSummaryProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          360° Feedback Summary
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Category Ratings
            </h4>
            <div className="space-y-4">
              {summary.ratings.map((rating) => (
                <div key={rating.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {rating.category}
                    </span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                          key={value}
                          className={cn(
                            'h-5 w-5',
                            value <= rating.averageRating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({rating.responses} responses)
                      </span>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                      <div
                        style={{ width: `${(rating.averageRating / 5) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Key Strengths
              </h4>
              <ul className="space-y-2">
                {summary.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-yellow-500" />
                Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {summary.improvements.map((improvement, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-2" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}