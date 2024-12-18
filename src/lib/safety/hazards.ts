import { atom } from 'jotai';

export type HazardType = 'PHYSICAL' | 'CHEMICAL' | 'BIOLOGICAL' | 'ERGONOMIC' | 'PSYCHOLOGICAL';
export type HazardStatus = 'IDENTIFIED' | 'ASSESSED' | 'CONTROLLED' | 'MONITORED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Hazard {
  id: string;
  type: HazardType;
  description: string;
  location: string;
  riskLevel: RiskLevel;
  controlMeasures: string[];
  status: HazardStatus;
  reportedBy: string;
  reportedAt: string;
  reviewDate: string;
  lastUpdated: string;
}

export const hazardsAtom = atom<Hazard[]>([]);

export const addHazard = (
  type: HazardType,
  description: string,
  location: string,
  riskLevel: RiskLevel,
  controlMeasures: string[],
  reportedBy: string
): Hazard => {
  const hazard: Hazard = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    description,
    location,
    riskLevel,
    controlMeasures,
    status: 'IDENTIFIED',
    reportedBy,
    reportedAt: new Date().toISOString(),
    reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    lastUpdated: new Date().toISOString(),
  };

  hazardsAtom.init = [...hazardsAtom.init, hazard];
  return hazard;
};

export const updateHazardStatus = (
  hazardId: string,
  status: HazardStatus
): void => {
  hazardsAtom.init = hazardsAtom.init.map(hazard =>
    hazard.id === hazardId
      ? {
          ...hazard,
          status,
          lastUpdated: new Date().toISOString(),
        }
      : hazard
  );
};

export const addControlMeasure = (
  hazardId: string,
  measure: string
): void => {
  hazardsAtom.init = hazardsAtom.init.map(hazard =>
    hazard.id === hazardId
      ? {
          ...hazard,
          controlMeasures: [...hazard.controlMeasures, measure],
          lastUpdated: new Date().toISOString(),
        }
      : hazard
  );
};

export const updateRiskLevel = (
  hazardId: string,
  riskLevel: RiskLevel
): void => {
  hazardsAtom.init = hazardsAtom.init.map(hazard =>
    hazard.id === hazardId
      ? {
          ...hazard,
          riskLevel,
          lastUpdated: new Date().toISOString(),
        }
      : hazard
  );
};

export const getHazardsByRiskLevel = (
  riskLevel: RiskLevel
): Hazard[] => {
  return hazardsAtom.init.filter(hazard => hazard.riskLevel === riskLevel);
};

export const getUncontrolledHazards = (): Hazard[] => {
  return hazardsAtom.init.filter(
    hazard => hazard.status === 'IDENTIFIED' || hazard.status === 'ASSESSED'
  );
};

export const getOverdueReviews = (): Hazard[] => {
  const now = new Date();
  return hazardsAtom.init.filter(
    hazard => new Date(hazard.reviewDate) < now
  );
};