import { atom } from 'jotai';

export interface Evidence {
  id: string;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  metadata?: {
    fileName: string;
    fileSize: number;
    mimeType: string;
  };
}

export const evidenceAtom = atom<Evidence[]>([]);

export const uploadEvidence = async (file: File, uploadedBy: string): Promise<Evidence> => {
  // In a real implementation, this would upload to a storage service
  // For now, we'll create a mock URL and evidence record
  const evidence: Evidence = {
    id: Math.random().toString(36).substr(2, 9),
    type: file.type,
    url: URL.createObjectURL(file), // This is temporary and for demo purposes only
    uploadedAt: new Date().toISOString(),
    uploadedBy,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    },
  };

  evidenceAtom.init = [...evidenceAtom.init, evidence];
  return evidence;
};

export const deleteEvidence = (evidenceId: string): void => {
  evidenceAtom.init = evidenceAtom.init.filter(e => e.id !== evidenceId);
};