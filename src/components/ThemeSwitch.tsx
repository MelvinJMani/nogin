import type { Mode } from '../types';

const MODES: Mode[] = ['pearl', 'carta', 'warm', 'amber'];

export default function ThemeSwitch() {
  const setMode = (m: Mode) =>
    document.documentElement.setAttribute('data-ink-mode', m);

  return (
    <div className='px-4 py-3'>
      <div className='flex flex-wrap gap-2'>
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className='eink-paper border border-black/60 px-2 py-1 text-sm'
            aria-label={`Switch to ${m} mode`}
          >
            {m[0].toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
