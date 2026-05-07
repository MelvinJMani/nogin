import type { Difficulty } from '../types';
import { DIFFICULTY_CONFIG } from '../types';

const DIFFICULTIES: Difficulty[] = ['very-easy', 'easy', 'medium', 'hard', 'very-hard', 'insane', 'inhuman'];

type Props = {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
  disabled?: boolean;
};

export function DifficultySelector({ value, onChange, disabled = false }: Props) {
  return (
    <div className='flex flex-wrap gap-2 justify-center'>
      {DIFFICULTIES.map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          disabled={disabled}
          className={`eink-paper border px-3 py-1.5 font-mono text-xs transition-opacity disabled:opacity-40 ${
            value === d
              ? 'border-2 border-[rgb(var(--ink-fg))] font-semibold text-[rgb(var(--ink-fg))]'
              : 'border-[rgb(var(--ink-border))] text-[rgb(var(--ink-weak))]'
          }`}
          aria-pressed={value === d}
        >
          {DIFFICULTY_CONFIG[d].label}
        </button>
      ))}
    </div>
  );
}
