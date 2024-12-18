```typescript
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type LeaveType = 'ANNUAL' | 'SICK' | 'PARENTAL' | 'BEREAVEMENT' | 'OTHER';
export type ParentalLeaveType = 'PRIMARY' | 'PARTNER' | 'EXTENDED';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  comments?: string;
  parentalLeaveDetails?: {
    type: ParentalLeaveType;
    expectedDueDate?: string;
    childBirthDate?: string;
    isAdoption?: boolean;
    adoptionDate?: string;
    partnerLeaveDetails?: {
      startDate: string;
      duration: number;
    };
    extendedLeaveDetails?: {
      startDate: string;
      duration: number;
    };
  };
}

export interface LeaveBalance {
  employeeId: string;
  annual: number;
  sick: number;
  parental: number;
  bereavement: number;
}

export interface CreateLeaveRequestData {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  parentalLeaveDetails?: LeaveRequest['parentalLeaveDetails'];
}

export interface ParentalLeaveEligibility {
  isPrimaryEligible: boolean;
  isPartnerEligible: boolean;
  primaryEntitlementWeeks: number;
  partnerEntitlementWeeks: number;
  extendedLeaveWeeks: number;
  issues: string[];
}
```