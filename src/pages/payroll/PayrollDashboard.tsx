
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPayrollPeriod, processPayrollPeriod } from '../../lib/payroll/api';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useParams } from 'react-router-dom';

export default function PayrollDashboard() {
  const { id: organizationId } = useParams();
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: payrollPeriods, isLoading } = useQuery(
    ['payrollPeriods', organizationId],
    async () => {
      const response = await fetch(`/api/payroll/periods?organizationId=${organizationId}`);
      if (!response.ok) throw new Error('Failed to fetch payroll periods');
      return response.json();
    }
  );

  const createMutation = useMutation(createPayrollPeriod, {
    onSuccess: () => {
      queryClient.invalidateQueries(['payrollPeriods']);
      setStartDate('');
      setEndDate('');
    },
  });

  const processMutation = useMutation(processPayrollPeriod, {
    onSuccess: () => {
      queryClient.invalidateQueries(['payrollPeriods']);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Pay Run</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          <Button
            onClick={() => createMutation.mutate({ startDate, endDate, organizationId: organizationId! })}
            disabled={createMutation.isLoading}
          >
            {createMutation.isLoading ? 'Creating...' : 'Create Pay Run'}
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Pay Runs</h2>
        {payrollPeriods?.map((period: any) => (
          <Card key={period.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {new Date(period.startDate).toLocaleDateString()} - 
                  {new Date(period.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Status: {period.status}</p>
              </div>
              {period.status === 'DRAFT' && (
                <Button
                  onClick={() => processMutation.mutate(period.id)}
                  disabled={processMutation.isLoading}
                >
                  Process Payroll
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
