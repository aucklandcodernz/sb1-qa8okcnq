
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
