import React from 'react';
import { useAtom } from 'jotai';
import { Outlet, Navigate } from 'react-router-dom';
import { userAtom } from '../../lib/auth';
import { mainNavLinks } from '../../lib/utils/links';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  const [user] = useAtom(userAtom);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Filter navigation links based on user role
  const filteredNavLinks = mainNavLinks.filter(link => 
    link.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar navLinks={filteredNavLinks} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}