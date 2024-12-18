import { atom } from 'jotai';
import { DisciplinaryCase, CreateDisciplinaryData, DisciplinaryType, DisciplinaryOutcome } from '../types/disciplinary';

export const disciplinaryCasesAtom = atom<DisciplinaryCase[]>([]);

export const createDisciplinaryCase = (
  data: CreateDisciplinaryData,
  createdBy: string
): DisciplinaryCase => {
  const newCase: DisciplinaryCase = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'PENDING',
    issueDate: new Date().toISOString(),
    meetings: [],
    warnings: [],
    createdBy,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  disciplinaryCasesAtom.init = [...disciplinaryCasesAtom.init, newCase];
  return newCase;
};

export const addDisciplinaryMeeting = (
  caseId: string,
  date: string,
  attendees: string[],
  notes: string,
  outcome?: string
): void => {
  disciplinaryCasesAtom.init = disciplinaryCasesAtom.init.map(case_ => {
    if (case_.id !== caseId) return case_;

    return {
      ...case_,
      meetings: [
        ...case_.meetings,
        {
          id: Math.random().toString(36).substr(2, 9),
          date,
          attendees,
          notes,
          outcome,
        },
      ],
      updatedAt: new Date().toISOString(),
    };
  });
};

export const issueDisciplinaryWarning = (
  caseId: string,
  type: DisciplinaryType,
  details: string,
  issuedBy: string,
  expiryDate?: string
): void => {
  disciplinaryCasesAtom.init = disciplinaryCasesAtom.init.map(case_ => {
    if (case_.id !== caseId) return case_;

    return {
      ...case_,
      warnings: [
        ...case_.warnings,
        {
          id: Math.random().toString(36).substr(2, 9),
          type,
          issueDate: new Date().toISOString(),
          expiryDate,
          issuedBy,
          details,
        },
      ],
      status: 'IN_PROGRESS',
      updatedAt: new Date().toISOString(),
    };
  });
};

export const resolveDisciplinaryCase = (
  caseId: string,
  outcome: DisciplinaryOutcome,
  details: string,
  decidedBy: string,
  appealDeadline?: string
): void => {
  disciplinaryCasesAtom.init = disciplinaryCasesAtom.init.map(case_ => {
    if (case_.id !== caseId) return case_;

    return {
      ...case_,
      status: 'RESOLVED',
      outcome: {
        decision: outcome,
        date: new Date().toISOString(),
        details,
        decidedBy,
        appealDeadline,
      },
      updatedAt: new Date().toISOString(),
    };
  });
};

export const fileDisciplinaryAppeal = (
  caseId: string,
  reason: string
): void => {
  disciplinaryCasesAtom.init = disciplinaryCasesAtom.init.map(case_ => {
    if (case_.id !== caseId) return case_;

    return {
      ...case_,
      status: 'APPEALED',
      appeal: {
        date: new Date().toISOString(),
        reason,
        status: 'PENDING',
      },
      updatedAt: new Date().toISOString(),
    };
  });
};

export const reviewDisciplinaryAppeal = (
  caseId: string,
  approved: boolean,
  reviewedBy: string,
  decision: string
): void => {
  disciplinaryCasesAtom.init = disciplinaryCasesAtom.init.map(case_ => {
    if (case_.id !== caseId || !case_.appeal) return case_;

    return {
      ...case_,
      appeal: {
        ...case_.appeal,
        status: approved ? 'APPROVED' : 'REJECTED',
        reviewedBy,
        decision,
        decisionDate: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };
  });
};

export const addDisciplinaryEvidence = (
  caseId: string,
  evidence: {
    type: string;
    url: string;
    uploadedBy: string;
  }
): void => {
  disciplinaryCasesAtom.init = disciplinaryCasesAtom.init.map(case_ => {
    if (case_.id !== caseId) return case_;

    return {
      ...case_,
      evidence: [
        ...(case_.evidence || []),
        {
          id: Math.random().toString(36).substr(2, 9),
          ...evidence,
          uploadedAt: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };
  });
};