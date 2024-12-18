import React from 'react';
import { format } from 'date-fns';
import { BookOpen, Clock, Users, Award, ChevronRight } from 'lucide-react';
import { Course } from '../../types/training';
import { cn } from '../../lib/utils';

interface CourseListProps {
  courses: Course[];
}

const statusConfig = {
  DRAFT: { color: 'text-gray-500', bgColor: 'bg-gray-50', label: 'Draft' },
  PUBLISHED: { color: 'text-green-500', bgColor: 'bg-green-50', label: 'Published' },
  ARCHIVED: { color: 'text-red-500', bgColor: 'bg-red-50', label: 'Archived' },
};

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <BookOpen className="h-5 w-5 mr-2 text-gray-400" />
          Available Courses
        </h3>
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {courses.map((course) => (
              <li key={course.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Award className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {course.title}
                      </p>
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusConfig[course.status].bgColor,
                        statusConfig[course.status].color
                      )}>
                        {statusConfig[course.status].label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {course.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration} hours
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.instructor.name}
                      </div>
                    </div>
                    {course.objectives.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Objectives:</p>
                        <ul className="mt-1 list-disc list-inside text-sm text-gray-500">
                          {course.objectives.slice(0, 2).map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                          {course.objectives.length > 2 && (
                            <li>
                              <span className="text-indigo-600">
                                +{course.objectives.length - 2} more
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {courses.length === 0 && (
              <li className="py-4">
                <p className="text-sm text-gray-500 text-center">
                  No courses available
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}