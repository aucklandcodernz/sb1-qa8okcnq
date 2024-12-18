import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/auth';
import Sidebar from './Sidebar';
import Header from './Header';
import SubscriptionBanner from '../subscription/SubscriptionBanner';

export default function Layout() {
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
        <main className="flex-1">
          <SubscriptionBanner daysRemaining={7} />
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}