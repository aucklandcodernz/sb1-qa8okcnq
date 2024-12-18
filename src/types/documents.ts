import { Role } from './auth';

export type DocumentType = 'CONTRACT' | 'POLICY' | 'FORM' | 'REPORT' | 'OTHER';
export type DocumentStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export interface Document {
  id: string;
  organizationId: string;
  type: DocumentType;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  version: number;
  status: DocumentStatus;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  accessRoles: Role[];
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileUrl: string;
  fileSize: number;
  createdBy: string;
  createdAt: string;
  changes?: string;
}

export interface CreateDocumentData {
  type: DocumentType;
  title: string;
  description?: string;
  file: File;
  tags?: string[];
  accessRoles?: Role[];
}

export interface ShareDocumentData {
  documentId: string;
  recipients: string[];
  message?: string;
  expiryDays?: number;
  allowDownload?: boolean;
}