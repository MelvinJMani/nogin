import { useState } from 'react';
import type { Mode } from '../types';

const MODES: Mode[] = ['pearl', 'carta', 'warm', 'amber'];

export default function ThemeSwitch() {
  const [activeMode, setActiveMode] = useState<Mode>('pearl');
  const setMode = (m: Mode) => {
    document.documentElement.setAttribute('data-ink-mode', m);
    setActiveMode(m);
  };

  return (
    <div className='px-4 py-3'>
      <div className='flex flex-wrap gap-2'>
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`eink-paper border border-black/60 px-2 py-1 text-sm transition
              ${
                activeMode === m
                  ? 'text-black font-bold border-2'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            aria-label={`Switch to ${m} mode`}
          >
            {m[0].toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
