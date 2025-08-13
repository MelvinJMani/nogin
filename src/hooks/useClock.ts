import { useEffect, useState } from 'react';

type PartType = Intl.DateTimeFormatPartTypes;
type DateParts = Partial<Record<PartType, string>>;

const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export function useClock() {
  const [text, setText] = useState('—');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });

    const tick = () => {
      const d = new Date();
      const parts = fmt.formatToParts(d).reduce<DateParts>((acc, p) => {
        acc[p.type] = p.value;
        return acc;
      }, {});
      const dayNum = parseInt(parts.day ?? '0', 10);
      const dateStr = `${parts.weekday}, ${ordinal(dayNum)} ${parts.month}`;
      const timeStr = d.toLocaleTimeString(undefined, {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      setText(`${dateStr} — ${timeStr}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return text;
}
