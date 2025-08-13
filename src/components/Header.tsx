import { useClock } from '../hooks/useClock';

export default function Header() {
  const clock = useClock();

  return (
    <header className='eink-paper border-b border-black/60'>
      <div className='w-full flex items-center justify-between px-4 py-3'>
        <span className='font-mono text-xl font-semibold uppercase'>NOGIN</span>
        <span className='font-mono text-sm' aria-live='polite'>
          {clock}
        </span>
      </div>
    </header>
  );
}
