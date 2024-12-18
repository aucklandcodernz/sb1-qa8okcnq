import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/auth';
import UserMenu from './UserMenu';
import NotificationCenter from '../notifications/NotificationCenter';

export default function Header() {
  const [user] = useAtom(userAtom);

  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Ask Your HR</h1>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}