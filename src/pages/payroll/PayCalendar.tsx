
import React from 'react';
import './PayCalendar.css';

export default function PayCalendar() {
  const payDays = [15, 30]; // Example pay days
  const holidays = [18]; // Example holidays

  const getDayClass = (day: number) => {
    let classes = ['calendar-day'];
    if (payDays.includes(day)) classes.push('payday');
    if (holidays.includes(day)) classes.push('holiday');
    return classes.join(' ');
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="text-xl font-semibold text-gray-900">Pay Calendar</h2>
        <p className="text-sm text-gray-500">Track payroll schedule and important dates</p>
      </div>

      <div className="calendar-grid">
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
      </div>
    </div>
  );
}
