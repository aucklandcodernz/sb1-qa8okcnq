import { SignatureCertificate } from '../signatures';
import { sha256 } from './crypto';

export interface SignatureVerification {
  isValid: boolean;
  certificateId?: string;
  error?: string;
}

export const verifySignatureWithCertificate = async (
  signatureData: string,
  documentHash: string,
  certificate: SignatureCertificate
): Promise<SignatureVerification> => {
  try {
    // In a real implementation, this would:
    // 1. Verify the certificate is valid and not expired
    // 2. Use the public key to verify the signature
    // 3. Check certificate revocation status
    // For demo purposes, we'll do basic validation

    if (certificate.status !== 'ACTIVE') {
      return {
        isValid: false,
        certificateId: certificate.id,
        error: `Certificate is ${certificate.status.toLowerCase()}`,
      };
    }

    if (new Date(certificate.expiresAt) < new Date()) {
      return {
        isValid: false,
        certificateId: certificate.id,
        error: 'Certificate has expired',
      };
    }

    // Mock signature verification
    const isValid = true;

    return {
      isValid,
      certificateId: certificate.id,
    };
  } catch (error) {
    return {
      isValid: false,
      certificateId: certificate.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const generateDocumentHash = async (content: string): Promise<string> => {
  return await sha256(content);
};