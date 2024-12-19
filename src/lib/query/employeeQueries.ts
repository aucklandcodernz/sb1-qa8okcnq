
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prisma } from '../db';

export function useEmployees(organizationId: string) {
  return useQuery({
    queryKey: ['employees', organizationId],
    queryFn: async () => {
      const response = await fetch(`/api/organizations/${organizationId}/employees`);
      if (!response.ok) throw new Error('Failed to fetch employees');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (employeeData: any) => {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) throw new Error('Failed to create employee');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}
