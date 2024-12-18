import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { usersAtom } from '../lib/users';
import { userAtom } from '../lib/auth';
import UserList from '../components/users/UserList';
import CreateUserForm from '../components/users/CreateUserForm';

export default function Users() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentUser] = useAtom(userAtom);
  const [users] = useAtom(usersAtom);

  // Filter users based on organization if not super admin
  const filteredUsers = currentUser?.role === 'SUPER_ADMIN'
    ? users
    : users.filter(user => user.organizationId === currentUser?.organizationId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage user accounts and permissions
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New User
        </button>
      </div>

      {showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Create New User</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <CreateUserForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      ) : (
        <UserList users={filteredUsers} />
      )}
    </div>
  );
}