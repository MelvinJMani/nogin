import { useState } from 'react';
import type { Mode } from '../types';

const MODES: Mode[] = ['pearl', 'carta', 'warm', 'amber', 'dark'];

const stored = localStorage.getItem('nogin:theme') as Mode | null;
const INITIAL_MODE: Mode = stored !== null && (MODES as string[]).includes(stored) ? stored : 'pearl';

export default function ThemeSwitch() {
  const [activeMode, setActiveMode] = useState<Mode>(INITIAL_MODE);

  const setMode = (m: Mode) => {
    document.documentElement.setAttribute('data-ink-mode', m);
    localStorage.setItem('nogin:theme', m);
    setActiveMode(m);
  };

  return (
    <div className='px-4 py-3'>
      <div className='flex flex-wrap gap-2'>
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`eink-paper border px-2 py-1 text-sm transition ${
              activeMode === m
                ? 'border-2 border-[rgb(var(--ink-fg))] font-bold text-[rgb(var(--ink-fg))]'
                : 'border-[rgb(var(--ink-border))] text-[rgb(var(--ink-weak))]'
            }`}
            aria-label={`Switch to ${m} mode`}
            aria-pressed={activeMode === m}
          >
            {m[0].toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
