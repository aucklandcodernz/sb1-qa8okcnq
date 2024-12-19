
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function PayrollDashboard() {
  const { id: organizationId } = useParams();
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: payrollPeriods, isLoading, error } = useQuery(
    ['payrollPeriods', organizationId],
    async () => {
      const response = await fetch(`/api/payroll/periods?organizationId=${organizationId}`);
      if (!response.ok) throw new Error('Failed to fetch payroll periods');
      return response.json();
    }
  );

  const createMutation = useMutation(
    async (data: { startDate: string; endDate: string; organizationId: string }) => {
      const response = await fetch('/api/payroll/periods/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create payroll period');
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['payrollPeriods']);
        setStartDate('');
        setEndDate('');
      },
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading payroll data</div>;

  return (
    <div className="space-y-6 p-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Pay Run</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <Button
            onClick={() => {
              if (organizationId && startDate && endDate) {
                createMutation.mutate({ startDate, endDate, organizationId });
              }
            }}
            disabled={createMutation.isLoading || !startDate || !endDate}
            className="w-full md:w-auto"
          >
            {createMutation.isLoading ? 'Creating...' : 'Create Pay Run'}
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Pay Runs</h2>
        {payrollPeriods?.length > 0 ? (
          payrollPeriods.map((period: any) => (
            <Card key={period.id} className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="font-medium">
                    {new Date(period.startDate).toLocaleDateString()} - 
                    {new Date(period.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">Status: {period.status}</p>
                </div>
                {period.status === 'PENDING' && (
                  <Button
                    onClick={() => {
                      // Handle process action
                    }}
                    className="w-full md:w-auto"
                  >
                    Process Payroll
                  </Button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-4">
            <p className="text-gray-500 text-center">No payroll periods found</p>
          </Card>
        )}
      </div>
    </div>
  );
}
