import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import SafetyNav from '../components/safety/SafetyNav';
import SafetyDashboard from './safety/SafetyDashboard';
import AccidentReports from './safety/AccidentReports';
import HazardManagement from './safety/HazardManagement';
import TrainingRecords from './safety/TrainingRecords';

export default function Safety() {
  const { id: organizationId } = useParams();

  if (!organizationId) {
    return <Navigate to="/organizations" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Health & Safety</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage workplace health and safety compliance
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <SafetyNav organizationId={organizationId} />
        
        <div className="p-6">
          <Routes>
            <Route index element={<SafetyDashboard />} />
            <Route path="accidents" element={<AccidentReports />} />
            <Route path="hazards" element={<HazardManagement />} />
            <Route path="training" element={<TrainingRecords />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}