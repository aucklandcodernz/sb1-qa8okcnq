import React from 'react';
import { format } from 'date-fns';
import { History, FileText, User, Clock } from 'lucide-react';
import { AuditEntry } from '../../lib/employee/audit';
import { cn } from '../../lib/utils';

interface AuditTrailProps {
  entries: AuditEntry[];
  className?: string;
}

const actionConfig = {
  CREATE: { color: 'text-green-500', bgColor: 'bg-green-50' },
  UPDATE: { color: 'text-blue-500', bgColor: 'bg-blue-50' },
  DELETE: { color: 'text-red-500', bgColor: 'bg-red-50' },
};

export default function AuditTrail({ entries, className }: AuditTrailProps) {
  return (
    <div className={cn('bg-white shadow-sm rounded-lg', className)}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
          <History className="h-5 w-5 mr-2 text-gray-400" />
          Audit Trail
        </h3>

        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {entries.map((entry, entryIdx) => (
              <li key={entry.id}>
                <div className="relative pb-8">
                  {entryIdx !== entries.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={cn(
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                        actionConfig[entry.action].bgColor
                      )}>
                        <FileText className={cn('h-5 w-5', actionConfig[entry.action].color)} />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {entry.action} {entry.entityType.toLowerCase()} 
                          {entry.changes && entry.changes.length > 0 && (
                            <span className="font-medium">
                              : {entry.changes.map(change => change.field).join(', ')}
                            </span>
                          )}
                        </p>
                        {entry.changes && entry.changes.length > 0 && (
                          <div className="mt-2 text-sm text-gray-700">
                            <ul className="list-disc pl-5 space-y-1">
                              {entry.changes.map((change, index) => (
                                <li key={index}>
                                  <span className="font-medium">{change.field}:</span>{' '}
                                  {change.oldValue} → {change.newValue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{entry.performedBy}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <time dateTime={entry.performedAt}>
                            {format(new Date(entry.performedAt), 'MMM d, yyyy HH:mm')}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}