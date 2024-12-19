
import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Card({ className, children, title, description }: CardProps) {
  return (
    <div className={cn("bg-white shadow-sm rounded-lg", className)}>
      <div className="px-4 py-5 sm:p-6">
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
