import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { leaveRequestsAtom } from '../lib/leave';
import { userAtom } from '../lib/auth';
import { employeeProfilesAtom } from '../lib/employees';
import LeaveManagementForm from '../components/leave/LeaveManagementForm';
import LeaveApprovalList from '../components/leave/LeaveApprovalList';
import LeaveHistory from '../components/leave/LeaveHistory';
import LeaveBalanceWidget from '../components/leave/LeaveBalanceWidget';

export default function LeaveManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [leaveRequests] = useAtom(leaveRequestsAtom);
  const [employeeProfiles] = useAtom(employeeProfilesAtom);

  const canApproveLeaves = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');
  const isEmployee = user?.role === 'EMPLOYEE';

  // Filter employees based on user's role and organization
  const availableEmployees = Object.values(employeeProfiles)
    .filter(emp => {
      if (user?.role === 'SUPER_ADMIN') return true;
      if (['ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '')) {
        return emp.organizationId === user?.organizationId;
      }
      if (user?.role === 'DEPT_MANAGER') {
        return emp.departmentId === user?.departmentId;
      }
      return emp.id === user?.id;
    })
    .map(emp => ({
      id: emp.id,
      name: `${emp.firstName} ${emp.lastName}`,
    }));

  const handleSubmit = (data: any) => {
    // Handle leave request submission
    console.log('Leave request:', data);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            {canApproveLeaves 
              ? 'Manage and approve leave requests'
              : 'Request and manage your leave applications'}
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Leave Request
        </button>
      </div>

      {showCreateForm ? (
        <LeaveManagementForm
          onSubmit={handleSubmit}
          onCancel={() => setShowCreateForm(false)}
          employees={availableEmployees}
          currentBalance={20} // This should come from actual leave balance
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {canApproveLeaves && (
              <LeaveApprovalList organizationId={user?.organizationId || ''} />
            )}
            <LeaveHistory
              requests={isEmployee 
                ? leaveRequests.filter(req => req.employeeId === user?.id)
                : leaveRequests}
            />
          </div>
          <div>
            <LeaveBalanceWidget employeeId={user?.id} />
          </div>
        </div>
      )}
    </div>
  );
}