import { useLongPress } from '../hooks/useLongPress';
import { vibrate, HAPTIC } from '../utils/haptics';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type Props = {
  notesMode: boolean;
  onNumber: (n: number) => void;
  onClear: () => void;
  onToggleNotes: () => void;
  disabled?: boolean;
};

export function NumberPad({ notesMode, onNumber, onClear, onToggleNotes, disabled = false }: Props) {
  const notesLongPress = useLongPress({
    onLongPress: () => {
      vibrate(HAPTIC.longPress);
      onToggleNotes();
    },
  });

  const handleNumber = (n: number) => {
    vibrate(HAPTIC.tap);
    onNumber(n);
  };

  const handleClear = () => {
    vibrate(HAPTIC.tap);
    onClear();
  };

  const handleToggleNotes = () => {
    vibrate(HAPTIC.tap);
    onToggleNotes();
  };

  return (
    <div
      className='fixed bottom-0 left-0 right-0 z-30 eink-paper border-t border-[rgb(var(--ink-border))]'
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className='flex items-center gap-1 px-2 py-2 max-w-lg mx-auto'>
        <button
          onClick={handleToggleNotes}
          {...notesLongPress}
          disabled={disabled}
          className={`border px-2 py-2 font-mono text-xs touch-manipulation shrink-0 disabled:opacity-40 transition-all ${
            notesMode
              ? 'border-2 border-[rgb(var(--ink-fg))] font-semibold text-[rgb(var(--ink-fg))]'
              : 'border-[rgb(var(--ink-border))] text-[rgb(var(--ink-weak))]'
          }`}
          aria-label='Toggle notes mode'
          aria-pressed={notesMode}
        >
          ✎
        </button>

        <div className='grid grid-cols-9 gap-1 flex-1'>
          {NUMBERS.map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(n)}
              disabled={disabled}
              className='eink-paper border border-[rgb(var(--ink-border))] py-2 font-mono text-sm text-[rgb(var(--ink-fg))] touch-manipulation disabled:opacity-40 aspect-square flex items-center justify-center'
              aria-label={`Place ${n}`}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          onClick={handleClear}
          disabled={disabled}
          className='border border-[rgb(var(--ink-border))] px-2 py-2 font-mono text-xs text-[rgb(var(--ink-weak))] touch-manipulation shrink-0 disabled:opacity-40'
          aria-label='Clear cell'
        >
          ✕
        </button>
      </div>
    </div>
  );
}
