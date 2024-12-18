import { atom } from 'jotai';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export const uploadedFilesAtom = atom<UploadedFile[]>([]);

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  // In a real implementation, this would upload to a storage service
  // For now, we'll create a mock URL and file record
  const uploadedFile: UploadedFile = {
    id: Math.random().toString(36).substr(2, 9),
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file), // This is temporary and for demo purposes only
    uploadedAt: new Date().toISOString(),
  };

  uploadedFilesAtom.init = [...uploadedFilesAtom.init, uploadedFile];
  return uploadedFile;
};

export const deleteUploadedFile = (fileId: string): void => {
  uploadedFilesAtom.init = uploadedFilesAtom.init.filter(file => file.id !== fileId);
};

export const getUploadedFiles = (fileIds: string[]): UploadedFile[] => {
  return uploadedFilesAtom.init.filter(file => fileIds.includes(file.id));
};