import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/auth';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AuthLayout() {
  const [user] = useAtom(userAtom);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}