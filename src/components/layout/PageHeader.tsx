import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-gray-700 hover:underline"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-gray-900">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center space-x-4">{actions}</div>}
      </div>
    </div>
  );
}