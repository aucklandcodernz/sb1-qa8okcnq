
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import type { OnboardingFormData } from '../lib/validations/onboarding';

export function useOnboardingStatus(employeeId: string) {
  const queryClient = useQueryClient();

  const { data: onboarding, isLoading, error } = useQuery({
    queryKey: ['onboarding', employeeId],
    queryFn: async () => {
      const response = await fetch(`/api/employees/${employeeId}/onboarding`);
      if (!response.ok) throw new Error('Failed to fetch onboarding status');
      return response.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<OnboardingFormData>) => {
      const response = await fetch(`/api/employees/${employeeId}/onboarding`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update onboarding status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding', employeeId] });
      toast.success('Onboarding status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    onboarding,
    isLoading,
    error,
    updateOnboarding: mutation.mutate,
    isUpdating: mutation.isLoading,
  };
}
