import { Link } from 'react-router-dom';
import './Home.css'; // Optional: create for custom styles if needed

const games = [
  { name: 'Sudoku', path: '/sudoku', icon: '🧩' },
  { name: '2048', path: '/2048', icon: '🔢' },
  { name: 'Tetris', path: '/tetris', icon: '🧱' },
  { name: 'Crosswords', path: '/crosswords', icon: '✏️' },
];

export default function Home() {
  return (
    <main className='home-main'>
      <header className='home-header'>
        <h1 className='home-title'>nogin</h1>
        <p className='home-tagline'>Brain games for everyone</p>
      </header>
      <nav aria-label='Game selection' className='home-grid'>
        {games.map((game) => (
          <Link
            key={game.name}
            to={game.path}
            className='card btn home-tile'
            aria-label={`Play ${game.name}`}
          >
            <span className='home-icon' aria-hidden='true'>
              {game.icon}
            </span>
            <span className='home-game-title'>{game.name}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
