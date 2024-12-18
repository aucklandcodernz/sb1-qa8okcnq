import React from 'react';
import { useAtom } from 'jotai';
import { attendanceRecordsAtom } from '../../lib/attendance';
import { Clock, Calendar, AlertCircle, Clock4 } from 'lucide-react';

interface AttendanceStatsProps {
  employeeId?: string;
}

export default function AttendanceStats({ employeeId }: AttendanceStatsProps) {
  const [attendanceRecords] = useAtom(attendanceRecordsAtom);
  
  if (!employeeId) return null;

  const currentMonth = attendanceRecords.find(
    record => record.employeeId === employeeId &&
    record.month === new Date().getMonth() + 1 &&
    record.year === new Date().getFullYear()
  );

  if (!currentMonth) return null;

  const stats = [
    {
      name: 'Present Days',
      value: currentMonth.presentDays,
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Late Days',
      value: currentMonth.lateDays,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Absent Days',
      value: currentMonth.absentDays,
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      name: 'Overtime Hours',
      value: Math.round(currentMonth.totalOvertime / 60),
      icon: Clock4,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Statistics</h3>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden border border-gray-200"
              >
                <dt>
                  <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}