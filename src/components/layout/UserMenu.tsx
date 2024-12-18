import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom, logout } from '../../lib/auth';
import { User, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(setUser);
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">
            {user.role.replace('_', ' ')}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/settings');
              }}
              className={cn(
                'w-full text-left px-4 py-2 text-sm text-gray-700',
                'hover:bg-gray-100 flex items-center'
              )}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className={cn(
                'w-full text-left px-4 py-2 text-sm text-gray-700',
                'hover:bg-gray-100 flex items-center'
              )}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}