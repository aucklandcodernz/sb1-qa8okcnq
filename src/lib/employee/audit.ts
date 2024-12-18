import { atom } from 'jotai';

export interface AuditEntry {
  id: string;
  employeeId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  entityType: 'PROFILE' | 'DOCUMENT' | 'FORM' | 'TIMESHEET' | 'LEAVE';
  entityId: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  performedBy: string;
  performedAt: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
}

export const auditTrailAtom = atom<AuditEntry[]>([]);

export const createAuditEntry = (
  employeeId: string,
  action: AuditEntry['action'],
  entityType: AuditEntry['entityType'],
  entityId: string,
  performedBy: string,
  changes?: AuditEntry['changes'],
  metadata?: Record<string, any>
): AuditEntry => {
  const entry: AuditEntry = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    action,
    entityType,
    entityId,
    changes,
    performedBy,
    performedAt: new Date().toISOString(),
    metadata,
  };

  auditTrailAtom.init = [...auditTrailAtom.init, entry];
  return entry;
};

export const getEmployeeAuditTrail = (employeeId: string): AuditEntry[] => {
  return auditTrailAtom.init
    .filter(entry => entry.employeeId === employeeId)
    .sort((a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime());
};