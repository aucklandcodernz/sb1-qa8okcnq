import { atom } from 'jotai';
import {
  Employee,
  EmploymentDetails,
  PersonalDetails,
  EmployeeDocument,
  EmployeeQualification,
  EmployeeSkill,
  EmploymentHistory,
  EmployeeBenefit
} from '../../types/employee/relationships';

// Primary employee atom
export const employeesAtom = atom<Record<string, Employee>>({});

// Related data atoms with foreign key relationships
export const employmentDetailsAtom = atom<Record<string, EmploymentDetails>>({});
export const personalDetailsAtom = atom<Record<string, PersonalDetails>>({});
export const employeeDocumentsAtom = atom<EmployeeDocument[]>([]);
export const employeeQualificationsAtom = atom<EmployeeQualification[]>([]);
export const employeeSkillsAtom = atom<EmployeeSkill[]>([]);
export const employmentHistoryAtom = atom<EmploymentHistory[]>([]);
export const employeeBenefitsAtom = atom<EmployeeBenefit[]>([]);

// Derived atoms for related data lookups
export const employeeDetailsAtom = atom((get) => {
  const employees = get(employeesAtom);
  const employmentDetails = get(employmentDetailsAtom);
  const personalDetails = get(personalDetailsAtom);

  return Object.entries(employees).reduce((acc, [id, employee]) => {
    acc[id] = {
      ...employee,
      employmentDetails: employmentDetails[id],
      personalDetails: personalDetails[id],
    };
    return acc;
  }, {} as Record<string, Employee & {
    employmentDetails?: EmploymentDetails;
    personalDetails?: PersonalDetails;
  }>);
});

// Utility functions for maintaining referential integrity
export const deleteEmployee = (employeeId: string) => {
  // Remove employee and all related records
  employeesAtom.init = Object.fromEntries(
    Object.entries(employeesAtom.init).filter(([id]) => id !== employeeId)
  );
  employmentDetailsAtom.init = Object.fromEntries(
    Object.entries(employmentDetailsAtom.init).filter(([id]) => id !== employeeId)
  );
  personalDetailsAtom.init = Object.fromEntries(
    Object.entries(personalDetailsAtom.init).filter(([id]) => id !== employeeId)
  );
  employeeDocumentsAtom.init = employeeDocumentsAtom.init
    .filter(doc => doc.employeeId !== employeeId);
  employeeQualificationsAtom.init = employeeQualificationsAtom.init
    .filter(qual => qual.employeeId !== employeeId);
  employeeSkillsAtom.init = employeeSkillsAtom.init
    .filter(skill => skill.employeeId !== employeeId);
  employmentHistoryAtom.init = employmentHistoryAtom.init
    .filter(history => history.employeeId !== employeeId);
  employeeBenefitsAtom.init = employeeBenefitsAtom.init
    .filter(benefit => benefit.employeeId !== employeeId);
};

// Validation functions
export const validateEmployeeRelationships = (employeeId: string): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  const employees = employeesAtom.init;
  const employmentDetails = employmentDetailsAtom.init;
  const personalDetails = personalDetailsAtom.init;

  // Check if employee exists
  if (!employees[employeeId]) {
    issues.push(`Employee ${employeeId} not found`);
    return { isValid: false, issues };
  }

  // Check required relationships
  if (!employmentDetails[employeeId]) {
    issues.push(`Missing employment details for employee ${employeeId}`);
  }

  if (!personalDetails[employeeId]) {
    issues.push(`Missing personal details for employee ${employeeId}`);
  }

  // Check document references
  const documents = employeeDocumentsAtom.init
    .filter(doc => doc.employeeId === employeeId);
  const qualifications = employeeQualificationsAtom.init
    .filter(qual => qual.employeeId === employeeId);

  qualifications.forEach(qual => {
    if (qual.documents?.some(docId => 
      !documents.find(doc => doc.id === docId)
    )) {
      issues.push(`Invalid document reference in qualification ${qual.id}`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
  };
};