import { atom } from 'jotai';
import { JobPosting, JobApplication, CreateJobPostingData } from '../types/recruitment';
import { OnboardingChecklist } from '../types/onboarding';

export const jobPostingsAtom = atom<JobPosting[]>([
  {
    id: 'job1',
    organizationId: '1',
    departmentId: 'd1',
    title: 'Senior Software Engineer',
    description: 'We are looking for an experienced software engineer...',
    requirements: [
      '5+ years of experience in web development',
      'Strong knowledge of React and TypeScript',
      'Experience with cloud technologies'
    ],
    responsibilities: [
      'Design and implement scalable solutions',
      'Mentor junior developers',
      'Participate in code reviews'
    ],
    type: 'FULL_TIME',
    location: 'Remote',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD'
    },
    benefits: [
      'Health insurance',
      'Remote work',
      'Professional development budget'
    ],
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    closingDate: '2024-04-30'
  }
]);

export const jobApplicationsAtom = atom<JobApplication[]>([]);

export const onboardingChecklistsAtom = atom<OnboardingChecklist[]>([
  {
    id: 'onboard1',
    employeeId: 'emp1',
    startDate: '2024-03-15',
    tasks: [
      {
        id: 'task1',
        employeeId: 'emp1',
        title: 'Complete Employment Forms',
        description: 'Fill out all required employment and tax forms',
        category: 'PAPERWORK',
        dueDate: '2024-03-15',
        assignedTo: 'HR_MANAGER',
        status: 'NOT_STARTED',
      },
      {
        id: 'task2',
        employeeId: 'emp1',
        title: 'IT Equipment Setup',
        description: 'Set up computer, email, and required software',
        category: 'IT_SETUP',
        dueDate: '2024-03-15',
        assignedTo: 'HR_MANAGER',
        status: 'NOT_STARTED',
      },
      {
        id: 'task3',
        employeeId: 'emp1',
        title: 'Team Introduction',
        description: 'Schedule meetings with team members and key stakeholders',
        category: 'INTRODUCTION',
        dueDate: '2024-03-15',
        assignedTo: 'DEPT_MANAGER',
        status: 'NOT_STARTED',
      },
    ],
    progress: 0,
    status: 'NOT_STARTED',
    mentor: {
      id: 'mentor1',
      name: 'Jane Smith',
      role: 'Senior Developer',
    },
  },
]);

export const createJobPosting = (
  organizationId: string,
  departmentId: string,
  data: CreateJobPostingData
): JobPosting => {
  const newJob: JobPosting = {
    id: Math.random().toString(36).substr(2, 9),
    organizationId,
    departmentId,
    ...data,
    status: 'DRAFT',
    benefits: data.benefits || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  jobPostingsAtom.init = [...jobPostingsAtom.init, newJob];
  return newJob;
};

export const updateJobStatus = (jobId: string, status: JobStatus): void => {
  jobPostingsAtom.init = jobPostingsAtom.init.map(job =>
    job.id === jobId
      ? { ...job, status, updatedAt: new Date().toISOString() }
      : job
  );
};

export const deleteJobPosting = (jobId: string): void => {
  jobPostingsAtom.init = jobPostingsAtom.init.filter(job => job.id !== jobId);
};

export const createJobApplication = (
  jobId: string,
  candidateData: any
): JobApplication => {
  const application: JobApplication = {
    id: Math.random().toString(36).substr(2, 9),
    jobId,
    candidate: candidateData,
    status: 'NEW',
    appliedAt: new Date().toISOString(),
    interviews: [],
    notes: [],
  };

  jobApplicationsAtom.init = [...jobApplicationsAtom.init, application];
  return application;
};

export const updateApplicationStatus = (
  applicationId: string,
  status: ApplicationStatus,
  note?: string
): void => {
  jobApplicationsAtom.init = jobApplicationsAtom.init.map(app => {
    if (app.id !== applicationId) return app;

    const updatedApp = { ...app, status };
    if (note) {
      updatedApp.notes = [
        ...app.notes,
        {
          id: Math.random().toString(36).substr(2, 9),
          content: note,
          createdAt: new Date().toISOString(),
        },
      ];
    }
    return updatedApp;
  });
};

export const scheduleInterview = (
  applicationId: string,
  interviewData: any
): void => {
  jobApplicationsAtom.init = jobApplicationsAtom.init.map(app => {
    if (app.id !== applicationId) return app;

    const newInterview = {
      id: Math.random().toString(36).substr(2, 9),
      ...interviewData,
      status: 'SCHEDULED',
    };

    return {
      ...app,
      interviews: [...app.interviews, newInterview],
      status: 'INTERVIEW',
    };
  });
};