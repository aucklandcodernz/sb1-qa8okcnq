import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'date-fns';
import { userAtom } from '../../lib/auth';

export default function WelcomeBanner() {
  const [user] = useAtom(userAtom);
  const currentTime = new Date();
  const hour = currentTime.getHours();

  let greeting = 'Good evening';
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-8 shadow-lg">
      <div className="relative z-10">
        <div className="text-sm font-medium text-white/80">
          {format(currentTime, 'EEEE, d MMMM yyyy')}
        </div>
        <h1 className="mt-2 text-2xl font-bold text-white">
          {greeting}, {user?.firstName}!
        </h1>
        <p className="mt-2 text-sm text-white/90">
          Welcome to your HR dashboard. Here's what's happening today.
        </p>
      </div>
      <div className="absolute right-0 top-0 -mt-10 -mr-10 h-32 w-32 rotate-12 transform rounded-3xl bg-white/10" />
      <div className="absolute bottom-0 left-1/3 -mb-10 h-24 w-24 -rotate-12 transform rounded-2xl bg-white/10" />
    </div>
  );
}