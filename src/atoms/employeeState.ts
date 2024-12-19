
import { atom } from 'jotai';
import { Employee } from '@prisma/client';

export const employeesAtom = atom<Employee[]>([]);
export const selectedEmployeeAtom = atom<Employee | null>(null);
export const employeeLoadingAtom = atom<boolean>(false);
export const employeeErrorAtom = atom<string | null>(null);
