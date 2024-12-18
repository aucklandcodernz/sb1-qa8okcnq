import React, { useState } from 'react';
import { useParams, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { jobPostingsAtom } from '../lib/recruitment';
import { userAtom } from '../lib/auth';
import RecruitmentNav from '../components/recruitment/RecruitmentNav';
import JobPostings from './recruitment/JobPostings';
import Applications from './recruitment/Applications';
import Onboarding from './recruitment/Onboarding';

export default function Recruitment() {
  const { id: organizationId } = useParams();
  const location = useLocation();
  const [user] = useAtom(userAtom);

  if (!organizationId) {
    return <Navigate to="/organizations" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Recruitment & Onboarding</h2>
        <p className="mt-1 text-sm text-gray-500">
          {user?.role === 'SUPER_ADMIN' 
            ? 'Manage recruitment across all organizations'
            : 'Manage job postings, applications, and onboarding processes'}
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <RecruitmentNav organizationId={organizationId} />
        
        <div className="p-6">
          <Routes>
            <Route index element={<JobPostings organizationId={organizationId} />} />
            <Route path="applications" element={<Applications organizationId={organizationId} />} />
            <Route path="onboarding" element={<Onboarding organizationId={organizationId} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}