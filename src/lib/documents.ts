import { atom } from 'jotai';
import { Document, DocumentVersion, CreateDocumentData } from '../types/documents';

export const documentsAtom = atom<Document[]>([
  {
    id: 'doc1',
    organizationId: '1',
    type: 'POLICY',
    title: 'Employee Handbook 2024',
    description: 'Official employee handbook with company policies and procedures',
    fileUrl: '/documents/handbook.pdf',
    fileType: 'application/pdf',
    fileSize: 2048576, // 2MB
    version: 1,
    status: 'ACTIVE',
    tags: ['policy', 'handbook', '2024'],
    createdBy: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    accessRoles: ['EMPLOYEE', 'HR_MANAGER', 'DEPT_MANAGER'],
  },
]);

export const documentVersionsAtom = atom<DocumentVersion[]>([
  {
    id: 'v1',
    documentId: 'doc1',
    version: 1,
    fileUrl: '/documents/handbook.pdf',
    fileSize: 2048576,
    createdBy: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    changes: 'Initial version',
  },
]);

export const uploadDocument = async (file: File): Promise<string> => {
  // In a real implementation, this would upload to a storage service
  // For now, we'll return a mock URL
  return `/documents/${file.name}`;
};

export const createDocument = async (
  organizationId: string,
  userId: string,
  data: CreateDocumentData
): Promise<Document> => {
  const fileUrl = await uploadDocument(data.file);
  
  const newDocument: Document = {
    id: Math.random().toString(36).substr(2, 9),
    organizationId,
    type: data.type,
    title: data.title,
    description: data.description,
    fileUrl,
    fileType: data.file.type,
    fileSize: data.file.size,
    version: 1,
    status: 'ACTIVE',
    tags: data.tags || [],
    createdBy: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accessRoles: data.accessRoles || ['EMPLOYEE'],
  };

  documentsAtom.init = [...documentsAtom.init, newDocument];

  // Create initial version
  const version: DocumentVersion = {
    id: Math.random().toString(36).substr(2, 9),
    documentId: newDocument.id,
    version: 1,
    fileUrl,
    fileSize: data.file.size,
    createdBy: userId,
    createdAt: new Date().toISOString(),
    changes: 'Initial version',
  };

  documentVersionsAtom.init = [...documentVersionsAtom.init, version];

  return newDocument;
};

export const archiveDocument = (documentId: string): void => {
  documentsAtom.init = documentsAtom.init.map(doc =>
    doc.id === documentId
      ? { ...doc, status: 'ARCHIVED' as const }
      : doc
  );
};

export const deleteDocument = (documentId: string): void => {
  documentsAtom.init = documentsAtom.init.filter(doc => doc.id !== documentId);
  documentVersionsAtom.init = documentVersionsAtom.init.filter(
    version => version.documentId !== documentId
  );
};

export const getDocumentVersions = (documentId: string): DocumentVersion[] => {
  return documentVersionsAtom.init
    .filter(version => version.documentId === documentId)
    .sort((a, b) => b.version - a.version);
};