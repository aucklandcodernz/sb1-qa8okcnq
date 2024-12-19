
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { selectedEmployeeAtom } from '../atoms/employeeState';
import type { Employee } from '@prisma/client';

export function useEmployeeData() {
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useAtom(selectedEmployeeAtom);

  const { data: employees, isLoading, error } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await fetch('/api/employees');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Employee[]>;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createEmployee = useMutation({
    mutationFn: async (newEmployee: Omit<Employee, 'id'>) => {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const updateEmployee = useMutation({
    mutationFn: async (updatedEmployee: Employee) => {
      const response = await fetch(`/api/employees/${updatedEmployee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  return {
    employees,
    isLoading,
    error,
    selectedEmployee,
    setSelectedEmployee,
    createEmployee,
    updateEmployee,
  };
}
