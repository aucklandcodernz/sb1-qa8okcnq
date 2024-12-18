import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, MoreVertical } from 'lucide-react';
import { UserProfile } from '../../types/user';
import { cn } from '../../lib/utils';

interface UserListProps {
  users: UserProfile[];
}

const roleColors = {
  'SUPER_ADMIN': 'bg-purple-100 text-purple-800',
  'ORG_ADMIN': 'bg-blue-100 text-blue-800',
  'HR_MANAGER': 'bg-green-100 text-green-800',
  'DEPT_MANAGER': 'bg-yellow-100 text-yellow-800',
  'SUPERVISOR': 'bg-orange-100 text-orange-800',
  'EMPLOYEE': 'bg-gray-100 text-gray-800',
  'STAKEHOLDER': 'bg-pink-100 text-pink-800',
};

export default function UserList({ users }: UserListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="mt-1">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        roleColors[user.role]
                      )}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/employees/${user.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Profile
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}