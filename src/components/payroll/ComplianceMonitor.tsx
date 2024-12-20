
import React from 'react';
import { Alert } from '../ui/Alert';

interface ComplianceItem {
  id: string;
  type: string;
  status: 'compliant' | 'non_compliant';
  details: string;
}

interface ComplianceMonitorProps {
  items?: ComplianceItem[];
}

export function ComplianceMonitor({ items = [] }: ComplianceMonitorProps) {
  const validateCompliance = (complianceItems: ComplianceItem[]) => {
    return {
      compliant: complianceItems.filter(item => item.status === 'compliant'),
      nonCompliant: complianceItems.filter(item => item.status === 'non_compliant')
    };
  };

  const { compliant, nonCompliant } = validateCompliance(items);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Compliance Status</h2>
      {nonCompliant.length > 0 && (
        <Alert variant="error">
          <h3 className="font-medium">Action Required</h3>
          <ul className="mt-2 space-y-1">
            {nonCompliant.map(item => (
              <li key={item.id}>{item.details}</li>
            ))}
          </ul>
        </Alert>
      )}
      {compliant.length > 0 && (
        <Alert variant="success">
          <h3 className="font-medium">Compliant Areas</h3>
          <ul className="mt-2 space-y-1">
            {compliant.map(item => (
              <li key={item.id}>{item.details}</li>
            ))}
          </ul>
        </Alert>
      )}
    </div>
  );
}

export default ComplianceMonitor;
