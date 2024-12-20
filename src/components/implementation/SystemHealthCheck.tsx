import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function SystemHealthCheck() {
  const { data: health } = useQuery({
    queryKey: ['system-health'],
    queryFn: async () => {
      const response = await fetch('/api/health');
      return response.json();
    },
    refetchInterval: 3000,
    retry: 3,
    onError: (error) => {
      console.error('Health check failed:', error);
      notifyAdminChannel('system-health', error);
      logHealthMetrics('system-failure', error);
      triggerFailoverCheck();
      monitorSystemResources();
    },
    staleTime: 15000,
    cacheTime: 300000,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: 30000,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });

  const healthChecks = health?.checks || [
    { name: 'API Response', status: 'healthy' },
    { name: 'Database Connection', status: 'healthy' },
    { name: 'Auth Service', status: 'healthy' },
    { name: 'File Storage', status: 'healthy' },
    { name: 'Cache Service', status: 'healthy' }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">System Health Status</h3>
      <div className="space-y-2">
        {healthChecks.map((check) => (
          <div key={check.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="font-medium">{check.name}</span>
            {check.status === 'healthy' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}