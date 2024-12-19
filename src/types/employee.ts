
export interface EmployeeProfile {
  id: string;
  userId: string;
  organizationId: string;
  departmentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  taxId: string;
  employeeId: string;
  department: string;
  position: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  startDate: string;
  manager: string;
  workLocation: string;
  office: string;
  workPhone: string;
  workEmail: string;
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
  nationality: string;
  maritalStatus: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
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
export interface OnboardingStatus {
  employeeId: string;
  startDate: string;
  completedTasks: number;
  totalTasks: number;
  currentPhase: 'DOCUMENTATION' | 'TRAINING' | 'SETUP' | 'COMPLETE';
  tasks: OnboardingTask[];
}

export interface OnboardingTask {
  id: string;
  title: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
  assignedTo: string;
  category: 'PAPERWORK' | 'IT_SETUP' | 'TRAINING' | 'INTRODUCTION';
}
