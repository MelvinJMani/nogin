import Header from './components/Header';
import ThemeSwitch from './components/ThemeSwitch';
import GameGrid from './components/GameGrid';

export default function App() {
  return (
    <div className='font-sans tracking-tight min-h-dvh bg-[rgb(var(--ink-bg))] text-[rgb(var(--ink-fg))]'>
      <Header />
      <ThemeSwitch />
      <GameGrid />
    </div>
  );
}
