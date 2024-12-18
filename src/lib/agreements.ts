import { atom } from 'jotai';
import { EmploymentAgreement, CreateAgreementData } from '../types/agreements';

export const agreementsAtom = atom<EmploymentAgreement[]>([]);

export const createAgreement = (data: CreateAgreementData): EmploymentAgreement => {
  const newAgreement: EmploymentAgreement = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'DRAFT',
    version: 1,
    signatures: {},
    reminders: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  agreementsAtom.init = [...agreementsAtom.init, newAgreement];
  return newAgreement;
};

export const updateAgreement = (
  agreementId: string,
  updates: Partial<EmploymentAgreement>
): void => {
  agreementsAtom.init = agreementsAtom.init.map(agreement =>
    agreement.id === agreementId
      ? {
          ...agreement,
          ...updates,
          version: agreement.version + 1,
          updatedAt: new Date().toISOString(),
        }
      : agreement
  );
};

export const signAgreement = (
  agreementId: string,
  signatureType: 'employee' | 'employer',
  signedBy?: string,
  ipAddress?: string
): void => {
  agreementsAtom.init = agreementsAtom.init.map(agreement => {
    if (agreement.id !== agreementId) return agreement;

    const signatures = { ...agreement.signatures };
    if (signatureType === 'employee') {
      signatures.employeeSignature = {
        signedAt: new Date().toISOString(),
        ipAddress,
      };
    } else {
      signatures.employerSignature = {
        signedBy: signedBy!,
        signedAt: new Date().toISOString(),
        ipAddress,
      };
    }

    const allSigned = signatures.employeeSignature && signatures.employerSignature;
    return {
      ...agreement,
      signatures,
      status: allSigned ? 'SIGNED' : 'PENDING_SIGNATURE',
      updatedAt: new Date().toISOString(),
    };
  });
};

export const terminateAgreement = (
  agreementId: string,
  reason: string
): void => {
  agreementsAtom.init = agreementsAtom.init.map(agreement =>
    agreement.id === agreementId
      ? {
          ...agreement,
          status: 'TERMINATED',
          terminationReason: reason,
          updatedAt: new Date().toISOString(),
        }
      : agreement
  );
};

export const addReminder = (
  agreementId: string,
  type: EmploymentAgreement['reminders'][0]['type']
): void => {
  agreementsAtom.init = agreementsAtom.init.map(agreement =>
    agreement.id === agreementId
      ? {
          ...agreement,
          reminders: [
            ...agreement.reminders,
            {
              type,
              sentAt: new Date().toISOString(),
              status: 'PENDING',
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : agreement
  );
};

export const checkExpiringAgreements = (
  daysThreshold: number = 30
): EmploymentAgreement[] => {
  const now = new Date();
  const threshold = new Date();
  threshold.setDate(threshold.getDate() + daysThreshold);

  return agreementsAtom.init.filter(agreement => {
    if (!agreement.endDate || agreement.status !== 'SIGNED') return false;
    const endDate = new Date(agreement.endDate);
    return endDate > now && endDate <= threshold;
  });
};

export const getActiveAgreement = (employeeId: string): EmploymentAgreement | null => {
  return agreementsAtom.init.find(
    agreement =>
      agreement.employeeId === employeeId &&
      agreement.status === 'SIGNED' &&
      (!agreement.endDate || new Date(agreement.endDate) > new Date())
  ) || null;
};