import React from 'react';
import { format } from 'date-fns';
import { OrganizationDetails } from '../../types/organization';
import { Users, Building2, Calendar, Clock } from 'lucide-react';

interface OrganizationOverviewProps {
  organization: OrganizationDetails;
}

export default function OrganizationOverview({ organization }: OrganizationOverviewProps) {
  const stats = [
    {
      name: 'Total Employees',
      value: organization.employees.length,
      icon: Users,
    },
    {
      name: 'Departments',
      value: organization.departments.length,
      icon: Building2,
    },
    {
      name: 'Created',
      value: format(new Date(organization.createdAt), 'MMM d, yyyy'),
      icon: Calendar,
    },
    {
      name: 'Last Updated',
      value: format(new Date(organization.updatedAt), 'MMM d, yyyy'),
      icon: Clock,
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="relative bg-gray-50 pt-5 px-4 pb-4 sm:pt-6 sm:px-6 rounded-lg overflow-hidden"
              >
                <dt>
                  <div className="absolute rounded-md p-3 bg-indigo-500">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}