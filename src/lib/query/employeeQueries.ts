
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Employee } from '@prisma/client'
import { atom, useAtom } from 'jotai'

export const selectedEmployeeAtom = atom<Employee | null>(null)

export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await fetch('/api/employees')
      if (!res.ok) throw new Error('Failed to fetch employees')
      return res.json()
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (employee: Omit<Employee, 'id'>) => {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      })
      if (!res.ok) throw new Error('Failed to create employee')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    }
  })
}
