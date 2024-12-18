import React from 'react';
import { AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { PayParityAnalysis } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface PayParityAlertProps {
  analysis: PayParityAnalysis;
  className?: string;
}

export default function PayParityAlert({ analysis, className }: PayParityAlertProps) {
  const hasSignificantDisparity = analysis.disparityFactors.some(f => f.impact > 0.2);

  if (!hasSignificantDisparity) return null;

  return (
    <div className={cn('rounded-md bg-yellow-50 p-4', className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Pay Parity Alert
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Significant salary variations detected for {analysis.role} role in {analysis.department} department:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {analysis.disparityFactors.map((factor, index) => (
                <li key={index}>
                  {factor.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex flex-wrap">
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              >
                Review Salaries
              </button>
              <button
                type="button"
                className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              >
                View Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}