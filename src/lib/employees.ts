import { atom } from 'jotai';
import { EmployeeProfile } from '../types/employee';

export const employeeProfilesAtom = atom<Record<string, EmployeeProfile>>({
  'emp1': {
    id: 'emp1',
    userId: 'user1',
    organizationId: '1',
    departmentId: 'd1',
    position: 'Software Engineer',
    employmentType: 'FULL_TIME',
    startDate: '2024-01-15',
    salary: {
      amount: 75000,
      currency: 'USD',
    },
    bankDetails: {
      accountName: 'John Smith',
      accountNumber: '****1234',
      bankName: 'Example Bank',
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phoneNumber: '+1234567890',
    },
    documents: [
      {
        id: 'doc1',
        type: 'CONTRACT',
        name: 'Employment Contract',
        url: '/documents/contract.pdf',
        uploadedAt: '2024-01-15',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js'],
    qualifications: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Example University',
        year: 2020,
      },
    ],
    status: 'ACTIVE',
  },
});

export const getEmployeeProfile = (employeeId: string): EmployeeProfile | null => {
  return employeeProfilesAtom.init[employeeId] || null;
};

export const updateEmployeeProfile = (
  employeeId: string,
  updates: Partial<EmployeeProfile>
): void => {
  const currentProfile = getEmployeeProfile(employeeId);
  if (currentProfile) {
    employeeProfilesAtom.init[employeeId] = {
      ...currentProfile,
      ...updates,
    };
  }
};