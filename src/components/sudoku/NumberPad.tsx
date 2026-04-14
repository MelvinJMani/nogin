import { useSudoku } from '../../hooks/useSudoku';

export function NumberPad() {
  const { setValue } = useSudoku();
  const buttonClasses =
    'eink-paper border border-black/60 px-2 py-1 m-2 text-sm transition bg-white text-black hover:bg-gray-200';
  return (
    <div style={{ marginTop: 16 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <button
          key={n}
          onClick={() => setValue(n)}
          className={buttonClasses}
          aria-label={`Set value to ${n}`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => setValue(null)}
        className={buttonClasses}
        aria-label='Clear value'
      >
        Clear
      </button>
    </div>
  );
}
