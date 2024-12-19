
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Employee } from '@prisma/client'
import { CreateEmployeeInput } from '../validations/employee'

const EMPLOYEE_KEYS = {
  all: ['employees'] as const,
  lists: () => [...EMPLOYEE_KEYS.all, 'list'] as const,
  list: (filters: any) => [...EMPLOYEE_KEYS.lists(), filters] as const,
  details: () => [...EMPLOYEE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...EMPLOYEE_KEYS.details(), id] as const,
}

export const useEmployees = (filters?: any) => {
  return useQuery(
    EMPLOYEE_KEYS.list(filters),
    async () => {
      const response = await fetch('/api/employees?' + new URLSearchParams(filters))
      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }
      return response.json()
    }
  )
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()
  
  return useMutation(
    async (data: CreateEmployeeInput) => {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create employee')
      }
      return response.json()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(EMPLOYEE_KEYS.lists())
      },
    }
  )
}
