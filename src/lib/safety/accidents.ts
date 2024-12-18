import { atom } from 'jotai';
import { AccidentReport, CreateAccidentReportData } from '../../types/safety/accidents';

export const accidentReportsAtom = atom<AccidentReport[]>([]);

export const createAccidentReport = (
  data: CreateAccidentReportData,
  createdBy: string
): AccidentReport => {
  const newReport: AccidentReport = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'REPORTED',
    documents: [],
    createdBy,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  accidentReportsAtom.init = [...accidentReportsAtom.init, newReport];
  return newReport;
};

export const updateAccidentStatus = (
  reportId: string,
  status: AccidentReport['status'],
  accNumber?: string
): void => {
  accidentReportsAtom.init = accidentReportsAtom.init.map(report =>
    report.id === reportId
      ? {
          ...report,
          status,
          accNumber,
          updatedAt: new Date().toISOString(),
        }
      : report
  );
};

export const addInvestigationFindings = (
  reportId: string,
  findings: string,
  recommendations: string[],
  assignedTo: string
): void => {
  accidentReportsAtom.init = accidentReportsAtom.init.map(report =>
    report.id === reportId
      ? {
          ...report,
          investigation: {
            assignedTo,
            findings,
            recommendations,
            completedAt: new Date().toISOString(),
          },
          status: 'INVESTIGATING',
          updatedAt: new Date().toISOString(),
        }
      : report
  );
};

export const addFollowUpActions = (
  reportId: string,
  actions: string[],
  dueDate: string
): void => {
  accidentReportsAtom.init = accidentReportsAtom.init.map(report =>
    report.id === reportId
      ? {
          ...report,
          followUp: {
            requiredActions: actions,
            dueDate,
          },
          updatedAt: new Date().toISOString(),
        }
      : report
  );
};

export const completeFollowUpActions = (reportId: string): void => {
  accidentReportsAtom.init = accidentReportsAtom.init.map(report =>
    report.id === reportId && report.followUp
      ? {
          ...report,
          followUp: {
            ...report.followUp,
            completedAt: new Date().toISOString(),
          },
          status: 'CLOSED',
          updatedAt: new Date().toISOString(),
        }
      : report
  );
};

export const addAccidentDocument = (
  reportId: string,
  document: {
    type: string;
    url: string;
  }
): void => {
  accidentReportsAtom.init = accidentReportsAtom.init.map(report =>
    report.id === reportId
      ? {
          ...report,
          documents: [
            ...report.documents,
            {
              id: Math.random().toString(36).substr(2, 9),
              ...document,
              uploadedAt: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        }
      : report
  );
};

export const getAccidentReports = (
  organizationId: string,
  filters?: {
    status?: AccidentReport['status'];
    severity?: AccidentReport['severity'];
    startDate?: string;
    endDate?: string;
  }
): AccidentReport[] => {
  return accidentReportsAtom.init
    .filter(report => {
      if (filters?.status && report.status !== filters.status) return false;
      if (filters?.severity && report.severity !== filters.severity) return false;
      if (filters?.startDate && report.date < filters.startDate) return false;
      if (filters?.endDate && report.date > filters.endDate) return false;
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getAccidentStatistics = (
  organizationId: string,
  startDate: string,
  endDate: string
): {
  total: number;
  bySeverity: Record<AccidentReport['severity'], number>;
  byStatus: Record<AccidentReport['status'], number>;
  averageResolutionDays: number;
} => {
  const reports = getAccidentReports(organizationId, { startDate, endDate });
  
  const bySeverity = reports.reduce((acc, report) => {
    acc[report.severity] = (acc[report.severity] || 0) + 1;
    return acc;
  }, {} as Record<AccidentReport['severity'], number>);

  const byStatus = reports.reduce((acc, report) => {
    acc[report.status] = (acc[report.status] || 0) + 1;
    return acc;
  }, {} as Record<AccidentReport['status'], number>);

  const closedReports = reports.filter(r => r.status === 'CLOSED');
  const totalResolutionDays = closedReports.reduce((sum, report) => {
    const reportDate = new Date(report.date);
    const closedDate = new Date(report.updatedAt);
    return sum + Math.ceil((closedDate.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));
  }, 0);

  return {
    total: reports.length,
    bySeverity,
    byStatus,
    averageResolutionDays: closedReports.length > 0 
      ? Math.round(totalResolutionDays / closedReports.length)
      : 0,
  };
};