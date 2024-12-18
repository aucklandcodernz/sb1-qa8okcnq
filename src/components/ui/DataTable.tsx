import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import Pagination from './Pagination';

export interface Column<T> {
  key: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
  className?: string;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  pageSize = 10,
  onRowClick,
  className,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Handle sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Handle pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg border', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100',
                    column.className
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="flex flex-col">
                        <ChevronUp 
                          className={cn(
                            'h-3 w-3',
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          )}
                        />
                        <ChevronDown 
                          className={cn(
                            'h-3 w-3',
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          )}
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  onRowClick && 'cursor-pointer hover:bg-gray-50'
                )}
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className={cn(
                      'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                      column.className
                    )}
                  >
                    {column.cell ? column.cell(row) : (row as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}