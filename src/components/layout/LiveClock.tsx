'use client';

import React, { useState, useEffect } from 'react';

export function LiveClock() {
  const [timeWithSeconds, setTimeWithSeconds] = useState<string>('10:30:00 AM PHT');
  const [timeWithoutSeconds, setTimeWithoutSeconds] = useState<string>('10:30 AM PHT');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      try {
        const now = new Date();
        const formattedFull = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        const formattedShort = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now);
        setTimeWithSeconds(`${formattedFull} PHT`);
        setTimeWithoutSeconds(`${formattedShort} PHT`);
      } catch {
        setTimeWithSeconds('Live PHT Clock');
        setTimeWithoutSeconds('Live PHT Clock');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="shrink-0 whitespace-nowrap">
      <span className="clock-seconds">{mounted ? timeWithSeconds : '10:30:00 AM PHT'}</span>
      <span className="clock-no-seconds">{mounted ? timeWithoutSeconds : '10:30 AM PHT'}</span>
    </span>
  );
}

