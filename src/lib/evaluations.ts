import { atom } from 'jotai';
import { CandidateEvaluation, CreateEvaluationData } from '../types/evaluation';

export const evaluationsAtom = atom<CandidateEvaluation[]>([]);

export const createEvaluation = (
  evaluatorId: string,
  evaluatorRole: string,
  data: CreateEvaluationData
): CandidateEvaluation => {
  const evaluation: CandidateEvaluation = {
    id: Math.random().toString(36).substr(2, 9),
    evaluatorId,
    evaluatorRole,
    ...data,
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  evaluationsAtom.init = [...evaluationsAtom.init, evaluation];
  return evaluation;
};

export const submitEvaluation = (evaluationId: string): void => {
  evaluationsAtom.init = evaluationsAtom.init.map(evaluation =>
    evaluation.id === evaluationId
      ? {
          ...evaluation,
          status: 'SUBMITTED',
          updatedAt: new Date().toISOString(),
        }
      : evaluation
  );
};

export const reviewEvaluation = (evaluationId: string): void => {
  evaluationsAtom.init = evaluationsAtom.init.map(evaluation =>
    evaluation.id === evaluationId
      ? {
          ...evaluation,
          status: 'REVIEWED',
          updatedAt: new Date().toISOString(),
        }
      : evaluation
  );
};