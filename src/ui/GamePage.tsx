import BackButton from '../components/BackButton';
import { games } from '../games';
import { useEffect } from 'react';
import { useSudoku } from '../hooks/useSudoku';

type GameKey = keyof typeof games;

export function GamePage({ game }: { game: GameKey }) {
  console.log('Rendering GamePage with game:', game);

  const gameConfig = games[game];
  const { start } = useSudoku();

  useEffect(() => {
    if (game === 'sudoku') {
      const today = new Date().toISOString().slice(0, 10);
      start(today, 'easy');
    }
  }, [game, start]);

  if (!gameConfig) {
    return <div>Game not found</div>;
  }

  const GameComponent = gameConfig.Component;

  return (
    <article className='eink-paper border border-black/60 p-4'>
      <div className='flex items-center gap-3 mb-2'>
        <BackButton />
        <h2 className='font-mono text-lg mb-0'>{gameConfig.title}</h2>
      </div>

      <GameComponent />
    </article>
  );
}
