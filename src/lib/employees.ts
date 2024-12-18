
import { atom } from 'jotai';
import { EmployeeProfile } from '../types/employee';

export const employeeProfilesAtom = atom<Record<string, EmployeeProfile>>({
  'emp1': {
    id: 'emp1',
    userId: 'user1',
    organizationId: '1',
    departmentId: 'd1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1234567890',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    taxId: 'TX123456',
    employeeId: 'EMP001',
    department: 'Engineering',
    position: 'Software Engineer',
    employmentType: 'FULL_TIME',
    startDate: '2024-01-15',
    manager: 'Sarah Wilson',
    workLocation: 'Auckland',
    office: 'Main Building',
    workPhone: '+1234567891',
    workEmail: 'j.smith@company.com',
    salary: {
      amount: 75000,
      currency: 'USD'
    },
    bankDetails: {
      accountName: 'John Smith',
      accountNumber: '****1234',
      bankName: 'Example Bank'
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phoneNumber: '+1234567890',
      email: 'jane.smith@email.com'
    },
    nationality: 'New Zealand',
    maritalStatus: 'Married',
    address: {
      street: '123 Main Street',
      city: 'Auckland',
      state: 'Auckland',
      postalCode: '1010',
      country: 'New Zealand'
    },
    documents: [
      {
        id: 'doc1',
        type: 'CONTRACT',
        name: 'Employment Contract',
        url: '/documents/contract.pdf',
        uploadedAt: '2024-01-15'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
    qualifications: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Auckland',
        year: 2020
      }
    ],
    status: 'ACTIVE'
  },
  'emp2': {
    id: 'emp2',
    userId: 'user2',
    organizationId: '1',
    departmentId: 'd2',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@company.com',
    phone: '+1234567892',
    dateOfBirth: '1985-08-22',
    gender: 'Female',
    taxId: 'TX123457',
    employeeId: 'EMP002',
    department: 'Engineering',
    position: 'Engineering Manager',
    employmentType: 'FULL_TIME',
    startDate: '2023-06-01',
    manager: 'David Chen',
    workLocation: 'Auckland',
    office: 'Main Building',
    workPhone: '+1234567893',
    workEmail: 's.wilson@company.com',
    salary: {
      amount: 120000,
      currency: 'USD'
    },
    bankDetails: {
      accountName: 'Sarah Wilson',
      accountNumber: '****5678',
      bankName: 'National Bank'
    },
    emergencyContact: {
      name: 'Michael Wilson',
      relationship: 'Spouse',
      phoneNumber: '+1234567894'
    },
    nationality: 'New Zealand',
    maritalStatus: 'Married',
    address: {
      street: '456 Park Avenue',
      city: 'Auckland',
      state: 'Auckland',
      postalCode: '1011',
      country: 'New Zealand'
    },
    documents: [
      {
        id: 'doc2',
        type: 'CONTRACT',
        name: 'Employment Contract',
        url: '/documents/contract2.pdf',
        uploadedAt: '2023-06-01'
      }
    ],
    skills: ['Team Leadership', 'Project Management', 'Agile', 'System Architecture'],
    qualifications: [
      {
        degree: 'Master of Engineering',
        institution: 'University of Wellington',
        year: 2010
      }
    ],
    status: 'ACTIVE'
  },
  'emp3': {
    id: 'emp3',
    userId: 'user3',
    organizationId: '1',
    departmentId: 'd3',
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@company.com',
    phone: '+1234567895',
    dateOfBirth: '1980-03-10',
    gender: 'Male',
    taxId: 'TX123458',
    employeeId: 'EMP003',
    department: 'Executive',
    position: 'CTO',
    employmentType: 'FULL_TIME',
    startDate: '2022-01-01',
    manager: '',
    workLocation: 'Auckland',
    office: 'Executive Suite',
    workPhone: '+1234567896',
    workEmail: 'd.chen@company.com',
    salary: {
      amount: 180000,
      currency: 'USD'
    },
    bankDetails: {
      accountName: 'David Chen',
      accountNumber: '****9012',
      bankName: 'Pacific Bank'
    },
    emergencyContact: {
      name: 'Linda Chen',
      relationship: 'Spouse',
      phoneNumber: '+1234567897'
    },
    nationality: 'New Zealand',
    maritalStatus: 'Married',
    address: {
      street: '789 Harbor View',
      city: 'Auckland',
      state: 'Auckland',
      postalCode: '1012',
      country: 'New Zealand'
    },
    documents: [
      {
        id: 'doc3',
        type: 'CONTRACT',
        name: 'Executive Contract',
        url: '/documents/contract3.pdf',
        uploadedAt: '2022-01-01'
      }
    ],
    skills: ['Executive Leadership', 'Strategic Planning', 'Technology Innovation', 'Enterprise Architecture'],
    qualifications: [
      {
        degree: 'PhD in Computer Science',
        institution: 'Stanford University',
        year: 2005
      }
    ],
    status: 'ACTIVE'
  }
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
