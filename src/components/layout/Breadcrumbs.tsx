import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbsProps {
  items?: { label: string; href?: string }[];
  className?: string;
}

export default function Breadcrumbs({ items = [], className }: BreadcrumbsProps) {
  const location = useLocation();
  
  // If no items provided, generate from current path
  const breadcrumbs = items.length > 0 ? items : location.pathname
    .split('/')
    .filter(Boolean)
    .map((path, index, array) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href: index < array.length - 1 ? `/${array.slice(0, index + 1).join('/')}` : undefined
    }));

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-500"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center">
            <ChevronRight className="h-5 w-5 text-gray-400" />
            {crumb.href ? (
              <Link
                to={crumb.href}
                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="ml-2 text-sm font-medium text-gray-900">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}