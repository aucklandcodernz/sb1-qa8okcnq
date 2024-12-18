import React from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { CourseEnrollment } from '../../types/training';
import { cn } from '../../lib/utils';

interface TrainingProgressProps {
  enrollments: CourseEnrollment[];
}

export default function TrainingProgress({ enrollments }: TrainingProgressProps) {
  const activeEnrollments = enrollments.filter(e => e.status !== 'COMPLETED' && e.status !== 'DROPPED');
  const completedCount = enrollments.filter(e => e.status === 'COMPLETED').length;
  const totalCount = enrollments.length;
  const overallProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <BookOpen className="h-5 w-5 mr-2 text-gray-400" />
          Training Progress
        </h3>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-gray-900">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {activeEnrollments.map((enrollment) => (
            <div key={enrollment.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{enrollment.courseId}</h4>
                <span className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  enrollment.status === 'IN_PROGRESS' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                )}>
                  {enrollment.status === 'IN_PROGRESS' ? (
                    <Clock className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {enrollment.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium text-gray-700">{enrollment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${enrollment.progress}%` }}
                />
              </div>

              {enrollment.assessmentScores.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-medium text-gray-700">Latest Assessment:</span>
                  <div className="mt-1 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      Score: {enrollment.assessmentScores[enrollment.assessmentScores.length - 1].score}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          {activeEnrollments.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No active training courses
            </p>
          )}
        </div>
      </div>
    </div>
  );
}