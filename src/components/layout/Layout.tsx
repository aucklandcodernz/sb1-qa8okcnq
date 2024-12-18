
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <MainNav />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
