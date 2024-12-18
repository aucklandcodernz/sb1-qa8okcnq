import { Role } from '../auth';

// Base employee interface with essential attributes
export interface Employee {
  id: string;
  userId: string;
  organizationId: string;
  departmentId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  position: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  startDate: string;
  endDate?: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
  createdAt: string;
  updatedAt: string;
}

// Employment details with one-to-one relationship
export interface EmploymentDetails {
  employeeId: string; // Foreign key to Employee
  salary: {
    amount: number;
    currency: string;
    frequency: 'HOURLY' | 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'ANNUALLY';
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branchCode?: string;
  };
  taxDetails: {
    taxCode: string;
    taxNumber?: string;
    kiwiSaverRate?: number;
  };
  workingHours: {
    hoursPerWeek: number;
    standardHours: {
      start: string;
      end: string;
    };
  };
  updatedAt: string;
}

// Personal details with one-to-one relationship
export interface PersonalDetails {
  employeeId: string; // Foreign key to Employee
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  residencyStatus?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phoneNumber?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email?: string;
  };
  updatedAt: string;
}

// Documents with one-to-many relationship
export interface EmployeeDocument {
  id: string;
  employeeId: string; // Foreign key to Employee
  type: 'CONTRACT' | 'ID' | 'VISA' | 'CERTIFICATE' | 'OTHER';
  title: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  expiryDate?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'ARCHIVED';
  metadata?: Record<string, any>;
}

// Qualifications with one-to-many relationship
export interface EmployeeQualification {
  id: string;
  employeeId: string; // Foreign key to Employee
  type: 'EDUCATION' | 'CERTIFICATION' | 'LICENSE';
  title: string;
  institution: string;
  dateObtained: string;
  expiryDate?: string;
  status: 'ACTIVE' | 'EXPIRED';
  verificationStatus: 'PENDING' | 'VERIFIED' | 'FAILED';
  documents?: string[]; // References to EmployeeDocument ids
  createdAt: string;
  updatedAt: string;
}

// Skills with many-to-many relationship
export interface EmployeeSkill {
  id: string;
  employeeId: string; // Foreign key to Employee
  skillId: string; // Foreign key to Skill catalog
  proficiencyLevel: 1 | 2 | 3 | 4 | 5;
  endorsements: number;
  lastUsed?: string;
  updatedAt: string;
}

// Work history with one-to-many relationship
export interface EmploymentHistory {
  id: string;
  employeeId: string; // Foreign key to Employee
  position: string;
  department: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
  reportsTo?: string; // Reference to another Employee id
  createdAt: string;
  updatedAt: string;
}

// Benefits with one-to-many relationship
export interface EmployeeBenefit {
  id: string;
  employeeId: string; // Foreign key to Employee
  type: string;
  provider: string;
  policyNumber?: string;
  startDate: string;
  endDate?: string;
  coverage: {
    type: string;
    amount: number;
    currency: string;
  };
  dependents?: {
    name: string;
    relationship: string;
    dateOfBirth: string;
  }[];
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}