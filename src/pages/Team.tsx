import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAtom } from 'jotai';
import { userAtom } from '../lib/auth';
import { employeeProfilesAtom } from '../lib/employees';
import TeamList from '../components/team/TeamList';
import TeamFilters from '../components/team/TeamFilters';
import TeamStats from '../components/team/TeamStats';
import SearchInput from '../components/ui/SearchInput';

export default function Team() {
  const [user] = useAtom(userAtom);
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  // Filter employees based on organization
  const organizationEmployees = Object.values(employeeProfiles).filter(
    profile => profile.organizationId === user?.organizationId
  );

  // Calculate team stats
  const stats = {
    totalEmployees: organizationEmployees.length,
    attendanceRate: 97.5,
    leaveRequests: organizationEmployees.filter(emp => emp.status === 'ON_LEAVE').length,
    averagePerformance: 4.2,
  };

  const filterOptions = [
    {
      id: 'department',
      label: 'Department',
      options: [
        { value: 'd1', label: 'Engineering' },
        { value: 'd2', label: 'Human Resources' },
        { value: 'd3', label: 'Sales' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'ON_LEAVE', label: 'On Leave' },
        { value: 'TERMINATED', label: 'Terminated' },
      ],
    },
    {
      id: 'employmentType',
      label: 'Employment Type',
      options: [
        { value: 'FULL_TIME', label: 'Full Time' },
        { value: 'PART_TIME', label: 'Part Time' },
        { value: 'CONTRACT', label: 'Contract' },
        { value: 'INTERN', label: 'Intern' },
      ],
    },
  ];

  // Apply search and filters
  const filteredEmployees = organizationEmployees.filter(employee => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    if (searchTerm && !`${employee.position}`.toLowerCase().includes(searchLower)) {
      return false;
    }

    // Department filter
    if (selectedFilters.department && employee.departmentId !== selectedFilters.department) {
      return false;
    }

    // Status filter
    if (selectedFilters.status && employee.status !== selectedFilters.status) {
      return false;
    }

    // Employment type filter
    if (selectedFilters.employmentType && employee.employmentType !== selectedFilters.employmentType) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view team members in your organization
          </p>
        </div>
        {['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '') && (
          <Link
            to="/employees/create"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Employee
          </Link>
        )}
      </div>

      <TeamStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <TeamFilters
            filters={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={(id, value) => 
              setSelectedFilters(prev => ({ ...prev, [id]: value }))
            }
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="w-64">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search team members..."
              onClear={() => setSearchTerm('')}
            />
          </div>

          <TeamList employees={filteredEmployees} />
        </div>
      </div>
    </div>
  );
}