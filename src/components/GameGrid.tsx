import type { Game } from '../types';
import { Link } from 'react-router-dom';

const GAMES: Game[] = [
  { name: 'Sudoku', path: '/sudoku', icon: '🧩' },
  { name: '2048', path: '/2048', icon: '🔢' },
  { name: 'Tetris', path: '/tetris', icon: '🧱' },
];

export default function GameGrid() {
  return (
    <section
      aria-labelledby='games'
      className='eink-paper border border-black/60 p-4'
    >
      <h2 id='games' className='font-mono text-lg mb-3'>
        Games
      </h2>
      <ul
        role='list'
        className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'
      >
        {GAMES.map((g) => (
          <li key={g.path}>
            <Link
              to={g.path}
              className='group eink-paper eink-dither border border-black/60 p-4 block focus:outline-none focus:ring-2 focus:ring-black'
              aria-label={`Open ${g.name}`}
            >
              <div className='flex items-start justify-between'>
                <span className='text-4xl leading-none select-none'>
                  {g.icon}
                </span>
                <span aria-hidden='true' className='font-mono'>
                  →
                </span>
              </div>
              <div className='mt-4 text-lg'>{g.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
