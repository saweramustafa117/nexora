import { useEffect, useState } from 'react';

export default function CountUp({ end, duration = 1200, suffix = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
