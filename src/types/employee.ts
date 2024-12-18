
export interface EmployeeProfile {
  id: string;
  userId: string;
  organizationId: string;
  departmentId: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  startDate: string;
  endDate?: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
  salary: {
    amount: number;
    currency: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email?: string;
  };
  documents: Array<{
    id: string;
    type: 'CONTRACT' | 'ID' | 'CERTIFICATE' | 'OTHER';
    name: string;
    url: string;
    uploadedAt: string;
  }>;
  skills: string[];
  qualifications: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
}

export interface CreateEmployeeProfileData {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  startDate: string;
  salary: {
    amount: number;
    currency: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  departmentId: string;
}
