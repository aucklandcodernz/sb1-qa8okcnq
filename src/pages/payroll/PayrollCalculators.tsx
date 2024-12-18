import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Shield } from 'lucide-react';
import PayeCalculator from '../../components/payroll/calculators/PayeCalculator';
import KiwiSaverCalculator from '../../components/payroll/calculators/KiwiSaverCalculator';
import AccLevyCalculator from '../../components/payroll/AccLevyCalculator';
import { cn } from '../../lib/utils';

type CalculatorType = 'paye' | 'kiwisaver' | 'acc';

export default function PayrollCalculators() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('paye');

  const calculators = [
    {
      id: 'paye',
      name: 'PAYE Calculator',
      icon: DollarSign,
      description: 'Calculate take-home pay and tax deductions',
    },
    {
      id: 'kiwisaver',
      name: 'KiwiSaver Calculator',
      icon: Percent,
      description: 'Project your KiwiSaver contributions and balance',
    },
    {
      id: 'acc',
      name: 'ACC Levy Calculator',
      icon: Shield,
      description: 'Calculate ACC levies and contributions',
    },
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'paye':
        return <PayeCalculator />;
      case 'kiwisaver':
        return <KiwiSaverCalculator />;
      case 'acc':
        return <AccLevyCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Payroll Calculators</h3>
        <p className="mt-1 text-sm text-gray-500">
          Calculate tax, KiwiSaver contributions, and ACC levies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id as CalculatorType)}
              className={cn(
                'p-4 rounded-lg text-left transition-colors',
                activeCalculator === calc.id
                  ? 'bg-indigo-50 border-2 border-indigo-500'
                  : 'bg-white border-2 border-gray-200 hover:border-indigo-200'
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  activeCalculator === calc.id ? 'bg-indigo-100' : 'bg-gray-100'
                )}>
                  <Icon className={cn(
                    'h-5 w-5',
                    activeCalculator === calc.id ? 'text-indigo-600' : 'text-gray-500'
                  )} />
                </div>
                <div>
                  <h4 className={cn(
                    'font-medium',
                    activeCalculator === calc.id ? 'text-indigo-900' : 'text-gray-900'
                  )}>
                    {calc.name}
                  </h4>
                  <p className={cn(
                    'text-sm',
                    activeCalculator === calc.id ? 'text-indigo-600' : 'text-gray-500'
                  )}>
                    {calc.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {renderCalculator()}
      </div>
    </div>
  );
}