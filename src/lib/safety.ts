import { atom } from 'jotai';
import { addDays, differenceInDays } from 'date-fns';
import { 
  SafetyCertificate, 
  SafetyTraining,
  CreateSafetyCertificateData,
  CreateSafetyTrainingData,
  SafetyCertificateStatus,
  SafetyTrainingType,
  SafetyTrainingStatus
} from '../types/safety';

export const safetyCertificatesAtom = atom<SafetyCertificate[]>([]);
export const safetyTrainingsAtom = atom<SafetyTraining[]>([]);

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

export const createSafetyTraining = (data: CreateSafetyTrainingData): SafetyTraining => {
  const newTraining: SafetyTraining = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'SCHEDULED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  safetyTrainingsAtom.init = [...safetyTrainingsAtom.init, newTraining];
  return newTraining;
};

export const updateCertificateStatus = (certificateId: string): void => {
  safetyCertificatesAtom.init = safetyCertificatesAtom.init.map(cert => {
    if (cert.id !== certificateId) return cert;

    const now = new Date();
    if (!cert.expiryDate) return cert;

    const expiryDate = new Date(cert.expiryDate);
    const daysUntilExpiry = differenceInDays(expiryDate, now);

    let status: SafetyCertificateStatus = 'ACTIVE';
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

export const verifyVisa = (
  visaId: string,
  verifiedBy: string,
  isVerified: boolean
): void => {
  safetyCertificatesAtom.init = safetyCertificatesAtom.init.map(cert =>
    cert.id === visaId
      ? {
          ...cert,
          verificationStatus: isVerified ? 'VERIFIED' : 'FAILED',
          verifiedAt: new Date().toISOString(),
          verifiedBy,
          updatedAt: new Date().toISOString(),
        }
      : cert
  );
};

export const completeSafetyTraining = (
  trainingId: string,
  certificateData?: CreateSafetyCertificateData
): void => {
  safetyTrainingsAtom.init = safetyTrainingsAtom.init.map(training => {
    if (training.id !== trainingId) return training;

    let certificate: SafetyCertificate | undefined;
    if (certificateData) {
      certificate = createSafetyCertificate(certificateData);
    }

    return {
      ...training,
      status: 'COMPLETED' as SafetyTrainingStatus,
      completedDate: new Date().toISOString(),
      certificate,
      updatedAt: new Date().toISOString(),
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

export const sendCertificateReminder = (
  certificateId: string,
  type: SafetyCertificate['reminders'][0]['type']
): void => {
  safetyCertificatesAtom.init = safetyCertificatesAtom.init.map(cert =>
    cert.id === certificateId
      ? {
          ...cert,
          reminders: [
            ...cert.reminders,
            {
              type,
              sentAt: new Date().toISOString(),
              status: 'PENDING',
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : cert
  );
};

export const checkExpiringSafetyCertificates = (
  warningDays: number[] = [90, 60, 30]
): SafetyCertificate[] => {
  const now = new Date();
  return safetyCertificatesAtom.init.filter(cert => {
    if (!cert.expiryDate || cert.status === 'EXPIRED' || cert.status === 'REVOKED') {
      return false;
    }

    const expiryDate = new Date(cert.expiryDate);
    const daysUntilExpiry = differenceInDays(expiryDate, now);

    return warningDays.includes(daysUntilExpiry);
  });
};

export const getActiveSafetyCertificates = (employeeId: string): SafetyCertificate[] => {
  return safetyCertificatesAtom.init.filter(
    cert =>
      cert.employeeId === employeeId &&
      cert.status !== 'EXPIRED' &&
      cert.status !== 'REVOKED'
  );
};

export const getRequiredTraining = (employeeId: string): SafetyTrainingType[] => {
  const activeCertificates = getActiveSafetyCertificates(employeeId);
  const allTrainingTypes: SafetyTrainingType[] = [
    'INDUCTION',
    'FIRST_AID',
    'FIRE_SAFETY',
    'HAZARD',
    'MANUAL_HANDLING',
    'EMERGENCY_RESPONSE',
  ];

  return allTrainingTypes.filter(
    type => !activeCertificates.some(cert => cert.type === type)
  );
};