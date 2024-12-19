
import { User } from '@prisma/client';
import { atom } from 'jotai';

interface LoginResponse {
  token: string;
  user: Pick<User, 'id' | 'email' | 'role'>;
}

interface AuthState {
  user: Pick<User, 'id' | 'email' | 'role'> | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const authStateAtom = atom<AuthState>({
  user: null,
  token: null,
  loading: false,
  error: null,
});

// Export individual functions for backwards compatibility
export async function login(email: string, password: string): Promise<LoginResponse> {
  return authService.login({ email, password });
}

export async function quickLogin(role: string): Promise<LoginResponse> {
  const user = TEST_USERS[role];
  if (!user) {
    throw new Error('Invalid role');
  }
  const mockToken = 'mock-token-' + Date.now();
  localStorage.setItem('token', mockToken);
  return { user, token: mockToken };
}

export async function register(data: {
  organizationName: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  password: string;
}): Promise<User> {
  return authService.registerOrganization(data);
}

export async function logout(): Promise<void> {
  return authService.logout();
}

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  },

  async logout(): Promise<void> {
    const response = await fetch('/api/auth/logout', {
      method: 'POST'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  },

  async registerOrganization(data: {
    organizationName: string;
    adminEmail: string;
    adminFirstName: string;
    adminLastName: string;
    password: string;
  }): Promise<User> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }
};
