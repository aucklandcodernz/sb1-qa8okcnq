import { atom } from 'jotai';
import { addDays, differenceInDays } from 'date-fns';
import { VisaDetails, CreateVisaData, VisaStatus } from '../types/visa';

export const visaDetailsAtom = atom<VisaDetails[]>([]);

export const createVisaDetails = (data: CreateVisaData): VisaDetails => {
  const newVisa: VisaDetails = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'ACTIVE',
    documents: [],
    verificationStatus: 'PENDING',
    notifications: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  visaDetailsAtom.init = [...visaDetailsAtom.init, newVisa];
  return newVisa;
};

export const updateVisaStatus = (visaId: string): void => {
  visaDetailsAtom.init = visaDetailsAtom.init.map(visa => {
    if (visa.id !== visaId) return visa;

    const now = new Date();
    const expiryDate = new Date(visa.expiryDate);
    const daysUntilExpiry = differenceInDays(expiryDate, now);

    let status: VisaStatus = 'ACTIVE';
    if (daysUntilExpiry <= 0) {
      status = 'EXPIRED';
    } else if (daysUntilExpiry <= 90) {
      status = 'EXPIRING_SOON';
    }

    return {
      ...visa,
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
  visaDetailsAtom.init = visaDetailsAtom.init.map(visa =>
    visa.id === visaId
      ? {
          ...visa,
          verificationStatus: isVerified ? 'VERIFIED' : 'FAILED',
          verifiedAt: new Date().toISOString(),
          verifiedBy,
          updatedAt: new Date().toISOString(),
        }
      : visa
  );
};

export const addVisaDocument = (
  visaId: string,
  document: {
    type: string;
    url: string;
  }
): void => {
  visaDetailsAtom.init = visaDetailsAtom.init.map(visa =>
    visa.id === visaId
      ? {
          ...visa,
          documents: [
            ...visa.documents,
            {
              id: Math.random().toString(36).substr(2, 9),
              ...document,
              uploadedAt: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : visa
  );
};

export const sendVisaNotification = (
  visaId: string,
  type: VisaDetails['notifications'][0]['type']
): void => {
  visaDetailsAtom.init = visaDetailsAtom.init.map(visa =>
    visa.id === visaId
      ? {
          ...visa,
          notifications: [
            ...visa.notifications,
            {
              type,
              sentAt: new Date().toISOString(),
              status: 'PENDING',
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : visa
  );
};

export const checkExpiringVisas = (
  warningDays: number[] = [90, 60, 30]
): VisaDetails[] => {
  const now = new Date();
  return visaDetailsAtom.init.filter(visa => {
    if (visa.status === 'EXPIRED' || visa.status === 'CANCELLED') return false;

    const expiryDate = new Date(visa.expiryDate);
    const daysUntilExpiry = differenceInDays(expiryDate, now);

    return warningDays.includes(daysUntilExpiry);
  });
};

export const getActiveVisa = (employeeId: string): VisaDetails | null => {
  return visaDetailsAtom.init.find(
    visa =>
      visa.employeeId === employeeId &&
      visa.status !== 'EXPIRED' &&
      visa.status !== 'CANCELLED'
  ) || null;
};

export const checkWorkRightsCompliance = (
  employeeId: string,
  weeklyHours: number
): {
  isCompliant: boolean;
  issues: string[];
} => {
  const visa = getActiveVisa(employeeId);
  const issues: string[] = [];

  if (!visa) {
    issues.push('No active visa found');
    return { isCompliant: false, issues };
  }

  if (visa.workRights.maxHoursPerWeek && weeklyHours > visa.workRights.maxHoursPerWeek) {
    issues.push(`Weekly hours (${weeklyHours}) exceed visa limit (${visa.workRights.maxHoursPerWeek})`);
  }

  return {
    isCompliant: issues.length === 0,
    issues,
  };
};