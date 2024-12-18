import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/auth';
import MainNav from './MainNav';

export default function Sidebar() {
  const [user] = useAtom(userAtom);

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-semibold">HR</span>
          </div>
          <span className="text-lg font-semibold">Ask Your HR</span>
        </div>
        <MainNav />
      </div>
    </div>
  );
}