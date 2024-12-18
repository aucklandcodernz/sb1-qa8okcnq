export interface EmployeeProfile {
  id: string;
  userId: string;
  organizationId: string;
  departmentId: string;
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
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email?: string;
  };
  documents: {
    id: string;
    type: 'CONTRACT' | 'ID' | 'CERTIFICATE' | 'OTHER';
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  skills: string[];
  qualifications: {
    degree: string;
    institution: string;
    year: number;
  }[];
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
}

export interface CreateEmployeeProfileData {
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
}