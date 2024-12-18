import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initial update to sync with the nearest minute
    const now = new Date();
    const timeToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeout = setTimeout(() => {
      setCurrentTime(new Date());
    }, timeToNextMinute);

    // Set up the interval after initial sync
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []); // Empty dependency array - only run on mount

  return currentTime;
};