import React from 'react';
import { PayParityAnalysis } from '../../types/payroll';
import { cn } from '../../lib/utils';

interface PayParityChartProps {
  analysis: PayParityAnalysis;
  className?: string;
}

export default function PayParityChart({ analysis, className }: PayParityChartProps) {
  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Salary Distribution - {analysis.role}
        </h3>

        <div className="space-y-4">
          {/* Summary Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500">Average Salary</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${Math.round(analysis.averageSalary).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500">Median Salary</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${Math.round(analysis.medianSalary).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-500">Salary Range</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${Math.round(analysis.salaryRange.max - analysis.salaryRange.min).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Salary Distribution</h4>
            {analysis.distribution.map((range, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{range.range}</span>
                  <span>{range.percentage.toFixed(1)}%</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${range.percentage}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {range.count} employees
                </p>
              </div>
            ))}
          </div>

          {/* Disparity Factors */}
          {analysis.disparityFactors.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Contributing Factors</h4>
              <div className="space-y-4">
                {analysis.disparityFactors.map((factor, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {factor.factor}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {(factor.impact * 100).toFixed(1)}% impact
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Recommendations</h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}