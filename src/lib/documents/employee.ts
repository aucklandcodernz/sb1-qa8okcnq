import { atom } from 'jotai';

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  type: 'CONTRACT' | 'ID' | 'VISA' | 'CERTIFICATE' | 'OTHER';
  name: string;
  url: string;
  uploadedAt: string;
  size?: number;
  metadata?: Record<string, any>;
}

export const employeeDocumentsAtom = atom<EmployeeDocument[]>([]);

export const uploadEmployeeDocument = async (
  employeeId: string,
  file: File,
  type: EmployeeDocument['type'],
  metadata?: Record<string, any>
): Promise<EmployeeDocument> => {
  // In a real implementation, this would upload to a storage service
  const document: EmployeeDocument = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    type,
    name: file.name,
    url: URL.createObjectURL(file),
    uploadedAt: new Date().toISOString(),
    size: file.size,
    metadata,
  };

  employeeDocumentsAtom.init = [...employeeDocumentsAtom.init, document];
  return document;
};

export const deleteEmployeeDocument = (documentId: string): void => {
  employeeDocumentsAtom.init = employeeDocumentsAtom.init.filter(
    doc => doc.id !== documentId
  );
};

export const getEmployeeDocuments = (employeeId: string): EmployeeDocument[] => {
  return employeeDocumentsAtom.init.filter(doc => doc.employeeId === employeeId);
};

export const getEmployeeDocumentsByType = (
  employeeId: string,
  type: EmployeeDocument['type']
): EmployeeDocument[] => {
  return employeeDocumentsAtom.init.filter(
    doc => doc.employeeId === employeeId && doc.type === type
  );
};