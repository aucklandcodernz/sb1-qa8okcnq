
import { useState, useEffect } from 'react';
import { OnboardingStatus, OnboardingTask } from '../types/onboarding';

export function useOnboarding(employeeId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingStatus | null>(null);

  useEffect(() => {
    fetchOnboarding();
  }, [employeeId]);

  const fetchOnboarding = async () => {
    try {
      const response = await fetch(`/api/onboarding/${employeeId}`);
      if (!response.ok) throw new Error('Failed to fetch onboarding data');
      const data = await response.json();
      setOnboarding(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const response = await fetch(`/api/onboarding/${employeeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      await fetchOnboarding(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  return { onboarding, loading, error, updateTaskStatus };
}
