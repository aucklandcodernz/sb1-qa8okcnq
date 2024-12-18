
import React, { useState } from 'react';
import './PayCalendar.css';
import { format, addMonths, subMonths, isSaturday, isSunday } from 'date-fns';

export default function PayCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const payDays = [15, 30];
  const holidays = [18];

  const getDayClass = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const classes = ['calendar-day'];
    if (payDays.includes(day)) classes.push('payday');
    if (holidays.includes(day)) classes.push('holiday');
    if (isSaturday(date) || isSunday(date)) classes.push('weekend');
    return classes.join(' ');
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Pay Calendar</h2>
          <p className="text-sm text-gray-500">Track payroll schedule and important dates</p>
        </div>
        <div className="calendar-nav">
          <button onClick={() => navigateMonth('prev')} className="nav-button">&lt;</button>
          <span className="text-lg font-medium">{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={() => navigateMonth('next')} className="nav-button">&gt;</button>
        </div>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
        {Array.from({ length: 31 }, (_, i) => (
          <div key={i + 1} className={getDayClass(i + 1)}>
            <span className="text-sm">{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#e8f5e9' }}></div>
          <span>Pay Day</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#fff3e0' }}></div>
          <span>Holiday</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f9fafb' }}></div>
          <span>Weekend</span>
        </div>
      </div>
    </div>
  );
}
