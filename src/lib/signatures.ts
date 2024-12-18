import { atom } from 'jotai';

export interface DigitalSignature {
  id: string;
  signedAt: string;
  signedBy: string;
  ipAddress?: string;
  userAgent?: string;
  signatureData?: string; // Base64 encoded signature image
  certificateId?: string;
}

export interface SignatureCertificate {
  id: string;
  userId: string;
  publicKey: string;
  createdAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
}

export const signatureCertificatesAtom = atom<SignatureCertificate[]>([]);

export const generateSignatureCertificate = async (userId: string): Promise<SignatureCertificate> => {
  // In a real implementation, this would generate a proper key pair
  const certificate: SignatureCertificate = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    publicKey: 'mock-public-key',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    status: 'ACTIVE',
  };

  signatureCertificatesAtom.init = [...signatureCertificatesAtom.init, certificate];
  return certificate;
};

export const verifySignature = async (
  signature: DigitalSignature,
  documentHash: string
): Promise<boolean> => {
  // In a real implementation, this would verify the signature cryptographically
  return true;
};

export const getSignatureCertificate = (userId: string): SignatureCertificate | null => {
  return signatureCertificatesAtom.init.find(
    cert => cert.userId === userId && cert.status === 'ACTIVE'
  ) || null;
};

export const revokeSignatureCertificate = (certificateId: string): void => {
  signatureCertificatesAtom.init = signatureCertificatesAtom.init.map(cert =>
    cert.id === certificateId
      ? { ...cert, status: 'REVOKED' }
      : cert
  );
};