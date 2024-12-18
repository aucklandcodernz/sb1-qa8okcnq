import { atom } from 'jotai';
import { LeaveRequest, LeaveBalance } from '../types/leave';

export const leaveRequestsAtom = atom<LeaveRequest[]>([
  {
    id: '1',
    employeeId: 'emp1',
    type: 'ANNUAL',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-20'),
    reason: 'Family vacation',
    status: 'PENDING',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
]);

export const leaveBalancesAtom = atom<Record<string, LeaveBalance>>({
  'emp1': {
    employeeId: 'emp1',
    annual: 20,
    sick: 10,
    parental: 0,
    bereavement: 5,
  },
});