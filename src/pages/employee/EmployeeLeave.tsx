import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { leaveRequestsAtom } from '../../lib/leave';
import { userAtom } from '../../lib/auth';
import LeaveBalanceWidget from '../../components/leave/LeaveBalanceWidget';
import LeaveHistory from '../../components/leave/LeaveHistory';
import LeaveApplicationForm from '../../components/leave/LeaveApplicationForm';
import LeaveApprovalQueue from '../../components/leave/LeaveApprovalQueue';

interface EmployeeLeaveProps {
  employeeId: string;
}

export default function EmployeeLeave({ employeeId }: EmployeeLeaveProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [leaveRequests] = useAtom(leaveRequestsAtom);

  const employeeLeaveRequests = leaveRequests.filter(
    request => request.employeeId === employeeId
  );

  const canApproveLeave = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER'].includes(user?.role || '');
  const isOwnProfile = user?.id === employeeId;

  const handleSubmitApplication = (data: any) => {
    // Handle leave application submission
    console.log('Leave application:', data);
    setShowApplicationForm(false);
  };

  const handleApproveLeave = (requestId: string) => {
    // Handle leave approval
    console.log('Approve leave:', requestId);
  };

  const handleRejectLeave = (requestId: string) => {
    // Handle leave rejection
    console.log('Reject leave:', requestId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Leave Management</h3>
        {isOwnProfile && (
          <button
            onClick={() => setShowApplicationForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Apply for Leave
          </button>
        )}
      </div>

      {showApplicationForm ? (
        <LeaveApplicationForm
          onSubmit={handleSubmitApplication}
          onCancel={() => setShowApplicationForm(false)}
          currentBalance={20} // This should come from actual leave balance
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LeaveHistory requests={employeeLeaveRequests} />
            {canApproveLeave && (
              <LeaveApprovalQueue
                requests={leaveRequests.filter(r => r.status === 'PENDING')}
                onApprove={handleApproveLeave}
                onReject={handleRejectLeave}
              />
            )}
          </div>
          <div>
            <LeaveBalanceWidget
              balance={{
                employeeId,
                annual: 20,
                sick: 10,
                parental: 0,
                bereavement: 5,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}