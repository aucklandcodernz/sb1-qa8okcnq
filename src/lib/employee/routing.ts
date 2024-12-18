import { atom } from 'jotai';
import { Role } from '../../types/auth';

export interface FormRoute {
  id: string;
  formType: string;
  approvers: {
    role: Role;
    order: number;
    required: boolean;
  }[];
  notifyRoles: Role[];
  autoApproveAfter?: number; // hours
  escalateAfter?: number; // hours
  active: boolean;
}

export interface FormApproval {
  id: string;
  formId: string;
  approverRole: Role;
  approverId?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comments?: string;
  actionDate?: string;
}

export const formRoutesAtom = atom<FormRoute[]>([
  {
    id: 'leave-request',
    formType: 'LEAVE_REQUEST',
    approvers: [
      { role: 'SUPERVISOR', order: 1, required: true },
      { role: 'DEPT_MANAGER', order: 2, required: true },
      { role: 'HR_MANAGER', order: 3, required: false },
    ],
    notifyRoles: ['HR_MANAGER'],
    escalateAfter: 48,
    active: true,
  },
  {
    id: 'expense-claim',
    formType: 'EXPENSE_CLAIM',
    approvers: [
      { role: 'DEPT_MANAGER', order: 1, required: true },
      { role: 'HR_MANAGER', order: 2, required: true },
    ],
    notifyRoles: ['HR_MANAGER', 'FINANCE'],
    escalateAfter: 72,
    active: true,
  },
]);

export const formApprovalsAtom = atom<FormApproval[]>([]);

export const getFormRoute = (formType: string): FormRoute | undefined => {
  return formRoutesAtom.init.find(
    route => route.formType === formType && route.active
  );
};

export const createFormApproval = (
  formId: string,
  formType: string
): FormApproval[] => {
  const route = getFormRoute(formType);
  if (!route) return [];

  const approvals = route.approvers.map(approver => ({
    id: Math.random().toString(36).substr(2, 9),
    formId,
    approverRole: approver.role,
    status: 'PENDING' as const,
  }));

  formApprovalsAtom.init = [...formApprovalsAtom.init, ...approvals];
  return approvals;
};

export const updateFormApproval = (
  approvalId: string,
  approverId: string,
  status: FormApproval['status'],
  comments?: string
): void => {
  formApprovalsAtom.init = formApprovalsAtom.init.map(approval =>
    approval.id === approvalId
      ? {
          ...approval,
          approverId,
          status,
          comments,
          actionDate: new Date().toISOString(),
        }
      : approval
  );
};

export const getFormApprovals = (formId: string): FormApproval[] => {
  return formApprovalsAtom.init
    .filter(approval => approval.formId === formId)
    .sort((a, b) => {
      const routeA = getFormRoute(a.formId);
      const routeB = getFormRoute(b.formId);
      const orderA = routeA?.approvers.find(x => x.role === a.approverRole)?.order || 0;
      const orderB = routeB?.approvers.find(x => x.role === b.approverRole)?.order || 0;
      return orderA - orderB;
    });
};

export const isFormFullyApproved = (formId: string): boolean => {
  const approvals = getFormApprovals(formId);
  return approvals.every(approval => approval.status === 'APPROVED');
};