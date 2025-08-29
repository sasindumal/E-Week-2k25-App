import { useEffect, useState } from 'react';

/**
 * useEventStatus
 * Determines event status (upcoming, live, concluded) and provides a ticking timeLeft object
 * - upcoming: countdown to startDate
 * - live: countdown to endDate
 * - concluded: after endDate
 */
export const useEventStatus = (startDate, endDate) => {
  const [status, setStatus] = useState('upcoming');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!startDate || !endDate) return;

    const update = () => {
      const now = Date.now();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      if (Number.isNaN(start) || Number.isNaN(end)) {
        setStatus('upcoming');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (now >= end) {
        setStatus('concluded');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (now >= start && now < end) {
        setStatus('live');
        const diff = end - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
        return;
      }

      const diff = start - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setStatus('upcoming');
      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return { status, timeLeft };
};
