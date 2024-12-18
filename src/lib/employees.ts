
import { atom } from 'jotai';
import { EmployeeProfile } from '../types/employee';

export const employeeProfilesAtom = atom<Record<string, EmployeeProfile>>({});

export const getEmployeeProfile = async (id: string): Promise<EmployeeProfile | null> => {
  // Mock implementation - replace with actual API call
  const profiles = await Promise.resolve({});
  return profiles[id] || null;
};

export const updateEmployeeProfile = async (id: string, data: Partial<EmployeeProfile>): Promise<void> => {
  // Mock implementation - replace with actual API call
  await Promise.resolve();
};
