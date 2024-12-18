import { atom } from 'jotai';
import { OnboardingChecklist, OnboardingTask, OnboardingStatus } from '../types/onboarding';

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
        assignedTo: 'IT_SUPPORT',
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

export const createOnboardingChecklist = (
  employeeId: string,
  startDate: string,
  mentorId?: string
): OnboardingChecklist => {
  const defaultTasks: OnboardingTask[] = [
    {
      id: Math.random().toString(36).substr(2, 9),
      employeeId,
      title: 'Complete Employment Forms',
      description: 'Fill out all required employment and tax forms',
      category: 'PAPERWORK',
      dueDate: startDate,
      assignedTo: 'HR_MANAGER',
      status: 'NOT_STARTED',
    },
    {
      id: Math.random().toString(36).substr(2, 9),
      employeeId,
      title: 'IT Equipment Setup',
      description: 'Set up computer, email, and required software',
      category: 'IT_SETUP',
      dueDate: startDate,
      assignedTo: 'IT_SUPPORT',
      status: 'NOT_STARTED',
    },
    {
      id: Math.random().toString(36).substr(2, 9),
      employeeId,
      title: 'Team Introduction',
      description: 'Schedule meetings with team members and key stakeholders',
      category: 'INTRODUCTION',
      dueDate: startDate,
      assignedTo: 'DEPT_MANAGER',
      status: 'NOT_STARTED',
    },
  ];

  const checklist: OnboardingChecklist = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    startDate,
    tasks: defaultTasks,
    progress: 0,
    status: 'NOT_STARTED',
  };

  onboardingChecklistsAtom.init = [...onboardingChecklistsAtom.init, checklist];
  return checklist;
};

export const addOnboardingTask = (
  checklistId: string,
  taskData: Omit<OnboardingTask, 'id' | 'status'>
): void => {
  onboardingChecklistsAtom.init = onboardingChecklistsAtom.init.map(checklist => {
    if (checklist.id !== checklistId) return checklist;

    const newTask: OnboardingTask = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'NOT_STARTED',
    };

    return {
      ...checklist,
      tasks: [...checklist.tasks, newTask],
    };
  });
};

export const updateTaskStatus = (
  checklistId: string,
  taskId: string,
  status: OnboardingStatus,
  note?: string
): void => {
  onboardingChecklistsAtom.init = onboardingChecklistsAtom.init.map(checklist => {
    if (checklist.id !== checklistId) return checklist;

    const updatedTasks = checklist.tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            status,
            completedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined,
            notes: note ? [...(task.notes || []), note] : task.notes,
          }
        : task
    );

    const completedTasks = updatedTasks.filter(task => task.status === 'COMPLETED').length;
    const progress = (completedTasks / updatedTasks.length) * 100;
    const checklistStatus = progress === 100 ? 'COMPLETED' : progress > 0 ? 'IN_PROGRESS' : 'NOT_STARTED';

    return {
      ...checklist,
      tasks: updatedTasks,
      progress,
      status: checklistStatus,
    };
  });
};

export const assignMentor = (
  checklistId: string,
  mentor: { id: string; name: string; role: string }
): void => {
  onboardingChecklistsAtom.init = onboardingChecklistsAtom.init.map(checklist =>
    checklist.id === checklistId
      ? { ...checklist, mentor }
      : checklist
  );
};