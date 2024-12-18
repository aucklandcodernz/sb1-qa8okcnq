import React from 'react';
import { cn } from '../../lib/utils';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn('flex space-x-1 border-b border-gray-200', className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps & { value: string }) {
  const context = React.useContext(TabsContext);
  const isSelected = context?.value === value;

  return (
    <button
      onClick={() => context?.onValueChange(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium border-b-2 -mb-px',
        isSelected
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsContentProps & { value: string }) {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;

  return (
    <div className={cn('focus:outline-none', className)}>
      {children}
    </div>
  );
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

export { TabsContext };