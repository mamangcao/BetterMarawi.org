'use client';

import React, { useState, useEffect } from 'react';

export function LiveClock() {
  const [phtTime, setPhtTime] = useState<string>('Live PHT Clock');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setPhtTime(`${formatted} PHT`);
      } catch {
        setPhtTime('Live PHT Clock');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>{mounted ? phtTime : '10:30:00 AM PHT'}</span>;
}

