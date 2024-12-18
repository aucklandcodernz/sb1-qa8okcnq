import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { authStateAtom, authService } from '../lib/auth/service';

export function useAuth() {
  const [authState, setAuthState] = useAtom(authStateAtom);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const user = await authService.login({ email, password });
      setAuthState({ user, token: 'mock-token', loading: false, error: null });
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      // Handle error without throwing
      console.error('Login error:', errorMessage);
      return null;
    }
  }, [setAuthState]);

  const registerOrganization = useCallback(async (data: {
    organizationName: string;
    adminEmail: string;
    adminFirstName: string;
    adminLastName: string;
    password: string;
  }) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await authService.registerOrganization(data);
      return result;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  }, [setAuthState]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setAuthState({ user: null, token: null, loading: false, error: null });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  }, [setAuthState]);

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    login,
    logout,
    registerOrganization,
  };
}