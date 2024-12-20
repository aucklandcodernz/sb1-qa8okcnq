
import React from 'react';
import { Alert } from '../ui/Alert';

interface MinimumWageCheckProps {
  check?: {
    isCompliant: boolean;
    actualRate: number;
    requiredRate: number;
    shortfall: number;
    effectiveDate: string;
  };
}

export function MinimumWageAlert({ check }: MinimumWageCheckProps) {
  if (!check) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Minimum Wage Compliance</h3>
      {!check.isCompliant ? (
        <Alert variant="error">
          <p>Minimum wage non-compliance detected</p>
          <p>Current rate: ${check.actualRate}/hr</p>
          <p>Required rate: ${check.requiredRate}/hr</p>
          <p>Shortfall: ${check.shortfall}/hr</p>
          <p>Effective date: {check.effectiveDate}</p>
        </Alert>
      ) : (
        <Alert variant="success">
          <p>All wages meet minimum requirements</p>
        </Alert>
      )}
    </div>
  );
}

export default MinimumWageAlert;
