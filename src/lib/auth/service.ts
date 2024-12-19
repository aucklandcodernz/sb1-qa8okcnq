import { atom } from 'jotai';
import { User } from '../../types/auth';
import { Organization } from '../../types/organization';

interface AuthState {
  user: User | null;
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

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterOrganizationData {
  organizationName: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Invalid credentials');
      }

      // Return mock user data
      return {
        id: 'org-admin-1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'ORG_ADMIN',
        organizationId: '1',
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async registerOrganization(data: RegisterOrganizationData): Promise<{ organization: Organization; user: User }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create organization
    const organization: Organization = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.organizationName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create admin user
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.adminEmail,
      firstName: data.adminFirstName,
      lastName: data.adminLastName,
      role: 'ORG_ADMIN',
      organizationId: organization.id,
    };

    return { organization, user };
  },

  async logout(): Promise<void> {
    // Clear auth state
    authStateAtom.init = {
      user: null,
      token: null,
      loading: false,
      error: null,
    };
  },
};