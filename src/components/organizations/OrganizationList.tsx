import React from 'react';
import { useAtom } from 'jotai';
import { organizationsAtom } from '../../lib/organizations';
import { Building2, MoreVertical, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrganizationList() {
  const [organizations] = useAtom(organizationsAtom);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {organizations.map((org) => (
              <li key={org.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {org.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created on {new Date(org.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/organizations/${org.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Details
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