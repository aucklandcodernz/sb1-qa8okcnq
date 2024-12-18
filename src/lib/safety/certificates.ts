import { atom } from 'jotai';
import { SafetyCertificate, CreateSafetyCertificateData } from '../../types/safety/certificates';
import { differenceInDays } from 'date-fns';

export const safetyCertificatesAtom = atom<SafetyCertificate[]>([]);

export const createSafetyCertificate = (data: CreateSafetyCertificateData): SafetyCertificate => {
  const newCertificate: SafetyCertificate = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'ACTIVE',
    documents: [],
    reminders: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  safetyCertificatesAtom.init = [...safetyCertificatesAtom.init, newCertificate];
  return newCertificate;
};

export const updateCertificateStatus = (certificateId: string): void => {
  safetyCertificatesAtom.init = safetyCertificatesAtom.init.map(cert => {
    if (cert.id !== certificateId) return cert;

    const now = new Date();
    if (!cert.expiryDate) return cert;

    const expiryDate = new Date(cert.expiryDate);
    const daysUntilExpiry = differenceInDays(expiryDate, now);

    let status = cert.status;
    if (daysUntilExpiry <= 0) {
      status = 'EXPIRED';
    } else if (daysUntilExpiry <= 90) {
      status = 'EXPIRING_SOON';
    }

    return {
      ...cert,
      status,
      updatedAt: now.toISOString(),
    };
  });
};

export const addCertificateDocument = (
  certificateId: string,
  document: {
    type: string;
    url: string;
  }
): void => {
  safetyCertificatesAtom.init = safetyCertificatesAtom.init.map(cert =>
    cert.id === certificateId
      ? {
          ...cert,
          documents: [
            ...cert.documents,
            {
              id: Math.random().toString(36).substr(2, 9),
              ...document,
              uploadedAt: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : cert
  );
};

export const getActiveSafetyCertificates = (employeeId: string): SafetyCertificate[] => {
  return safetyCertificatesAtom.init.filter(
    cert =>
      cert.employeeId === employeeId &&
      cert.status !== 'EXPIRED' &&
      cert.status !== 'REVOKED'
  );
};