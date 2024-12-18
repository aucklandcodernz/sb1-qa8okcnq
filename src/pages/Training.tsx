import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus, BookOpen, Users, Award } from 'lucide-react';
import { coursesAtom, courseEnrollmentsAtom } from '../lib/training';
import { userAtom } from '../lib/auth';
import CourseList from '../components/training/CourseList';
import CreateCourseForm from '../components/training/CreateCourseForm';
import MyEnrollments from '../components/training/MyEnrollments';
import TrainingCalendar from '../components/training/TrainingCalendar';

export default function Training() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [courses] = useAtom(coursesAtom);
  const [enrollments] = useAtom(courseEnrollmentsAtom);

  const canCreateCourse = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');
  const userEnrollments = enrollments.filter(e => e.userId === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training & Development</h2>
          <p className="mt-1 text-sm text-gray-500">
            Access training courses and track your progress
          </p>
        </div>
        {canCreateCourse && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Create Course
          </button>
        )}
      </div>

      {showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Create New Course</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <CreateCourseForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CourseList courses={courses} />
          </div>
          <div className="space-y-6">
            <MyEnrollments enrollments={userEnrollments} />
            <TrainingCalendar />
          </div>
        </div>
      )}
    </div>
  );
}