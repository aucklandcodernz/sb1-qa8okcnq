import { atom } from 'jotai';
import { TimeEntry, AttendanceRecord, WorkSchedule } from '../types/attendance';

export const timeEntriesAtom = atom<TimeEntry[]>([
  {
    id: '1',
    employeeId: 'emp1',
    date: '2024-03-14',
    clockIn: '09:00',
    clockOut: '17:30',
    status: 'PRESENT',
    overtime: 30,
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Work Street, New York, NY',
    },
  },
]);

export const attendanceRecordsAtom = atom<AttendanceRecord[]>([
  {
    id: '1',
    employeeId: 'emp1',
    month: 3,
    year: 2024,
    totalDays: 31,
    presentDays: 22,
    absentDays: 2,
    lateDays: 1,
    halfDays: 0,
    totalOvertime: 120,
    records: [],
  },
]);

export const workSchedulesAtom = atom<WorkSchedule[]>([
  {
    id: '1',
    employeeId: 'emp1',
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '17:00',
    isWorkingDay: true,
  },
  {
    id: '2',
    employeeId: 'emp1',
    dayOfWeek: 2,
    startTime: '09:00',
    endTime: '17:00',
    isWorkingDay: true,
  },
  {
    id: '3',
    employeeId: 'emp1',
    dayOfWeek: 3,
    startTime: '09:00',
    endTime: '17:00',
    isWorkingDay: true,
  },
  {
    id: '4',
    employeeId: 'emp1',
    dayOfWeek: 4,
    startTime: '09:00',
    endTime: '17:00',
    isWorkingDay: true,
  },
  {
    id: '5',
    employeeId: 'emp1',
    dayOfWeek: 5,
    startTime: '09:00',
    endTime: '17:00',
    isWorkingDay: true,
  },
]);

export const clockIn = (employeeId: string, location?: { latitude: number; longitude: number; address: string }) => {
  const now = new Date();
  const newEntry: TimeEntry = {
    id: Math.random().toString(36).substr(2, 9),
    employeeId,
    date: now.toISOString().split('T')[0],
    clockIn: now.toTimeString().split(' ')[0].substr(0, 5),
    status: 'PRESENT',
    location,
  };

  timeEntriesAtom.init = [...timeEntriesAtom.init, newEntry];
  return newEntry;
};

export const clockOut = (employeeId: string, location?: { latitude: number; longitude: number; address: string }) => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().split(' ')[0].substr(0, 5);

  const updatedEntries = timeEntriesAtom.init.map(entry => {
    if (entry.employeeId === employeeId && entry.date === today && !entry.clockOut) {
      const clockInTime = new Date(`${today}T${entry.clockIn}`);
      const clockOutTime = new Date(`${today}T${currentTime}`);
      const overtime = Math.max(0, (clockOutTime.getTime() - clockInTime.getTime()) / 1000 / 60 - 480); // 480 minutes = 8 hours

      return {
        ...entry,
        clockOut: currentTime,
        overtime,
        location: location || entry.location,
      };
    }
    return entry;
  });

  timeEntriesAtom.init = updatedEntries;
};