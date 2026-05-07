import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ThemeSwitch from '../components/ThemeSwitch';
import { useDailyLimitStore } from '../features/daily-limit/store/useDailyLimitStore';

export function AppLayout() {
  const hydrate = useDailyLimitStore((s) => s.hydrate);
  const isHydrated = useDailyLimitStore((s) => s.isHydrated);

  useEffect(() => {
    if (!isHydrated) void hydrate();
  }, [hydrate, isHydrated]);

  return (
    <div className='font-sans tracking-tight min-h-dvh bg-[rgb(var(--ink-bg))] text-[rgb(var(--ink-fg))]'>
      <Header />
      <ThemeSwitch />

      <main className='px-4 pb-16'>
        <Outlet />
      </main>
    </div>
  );
}
