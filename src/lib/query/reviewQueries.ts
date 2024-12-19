
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { PerformanceReview } from '../../types/performance';

interface ReviewsResponse {
  reviews: PerformanceReview[];
  pagination: {
    total: number;
    pages: number;
    current: number;
  };
}

export function useReviews(params: { 
  employeeId?: string;
  status?: string;
  department?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery<ReviewsResponse>({
    queryKey: ['reviews', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value.toString());
      });
      
      const response = await fetch(`/api/reviews?${searchParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return response.json();
    }
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<PerformanceReview>) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create review');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PerformanceReview> }) => {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update review');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
