import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../lib/auth';
import PerformanceNav from '../components/performance/PerformanceNav';
import PerformanceReviews from './performance/PerformanceReviews';
import Feedback360 from './performance/Feedback360';
import GoalsDevelopment from './performance/GoalsDevelopment';

export default function Performance() {
  const [user] = useAtom(userAtom);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Performance Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage performance reviews, feedback, and development goals
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <PerformanceNav />
        
        <div className="p-6">
          <Routes>
            <Route index element={<Navigate to="reviews" replace />} />
            <Route path="reviews" element={<PerformanceReviews />} />
            <Route path="feedback" element={<Feedback360 />} />
            <Route path="goals" element={<GoalsDevelopment />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}