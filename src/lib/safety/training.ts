import { atom } from 'jotai';
import { SafetyTraining, SafetyTrainingType, CreateSafetyTrainingData } from '../../types/safety/training';
import { createSafetyCertificate, CreateSafetyCertificateData } from './certificates';

export const safetyTrainingsAtom = atom<SafetyTraining[]>([]);

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

export const completeSafetyTraining = (
  trainingId: string,
  certificateData?: CreateSafetyCertificateData
): void => {
  safetyTrainingsAtom.init = safetyTrainingsAtom.init.map(training => {
    if (training.id !== trainingId) return training;

    let certificate;
    if (certificateData) {
      certificate = createSafetyCertificate(certificateData);
    }

    return {
      ...training,
      status: 'COMPLETED',
      completedDate: new Date().toISOString(),
      certificate,
      updatedAt: new Date().toISOString(),
    };
  });
};

export const getRequiredTraining = (employeeId: string): SafetyTrainingType[] => {
  const allTrainingTypes: SafetyTrainingType[] = [
    'INDUCTION',
    'FIRST_AID',
    'FIRE_SAFETY',
    'HAZARD',
    'MANUAL_HANDLING',
    'EMERGENCY_RESPONSE',
  ];

  const completedTrainings = safetyTrainingsAtom.init
    .filter(training => 
      training.employeeId === employeeId && 
      training.status === 'COMPLETED'
    );

  return allTrainingTypes.filter(
    type => !completedTrainings.some(training => training.type === type)
  );
};