import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ThemeSwitch from '../components/ThemeSwitch';

export function AppLayout() {
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
