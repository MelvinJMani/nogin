import { useState, useEffect } from 'react';
import { use2048 } from '../hooks/use2048';
import { use2048Keyboard } from '../hooks/use2048Keyboard';
import { useDailyLimit } from '../../../features/daily-limit/hooks/useDailyLimit';
import { Board2048 } from './Board2048';
import { Controls2048 } from './Controls2048';
import { GameOverModal } from './GameOverModal';
import { ResumeDialog2048 } from './ResumeDialog';
import { DailyLimitScreen } from '../../sudoku/ui/DailyLimitScreen';

export function Game2048() {
  const { state, newTileIds, move, newGame, resumeGame, continueAfterWin, hasSavedGame, isLoading } =
    use2048();
  const { isLimitReached, usedTodayMs, dailyBudgetMs, isHydrated } = useDailyLimit();

  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (!isLoading && hasSavedGame) {
      setShowResume(true);
    } else if (!isLoading && !hasSavedGame && state === null) {
      newGame();
    }
  }, [isLoading, hasSavedGame]);

  const showModal =
    state !== null && (state.isOver || (state.hasWon && !state.continueAfterWin));

  const interactionsEnabled =
    !showResume && !showModal && !isLimitReached && state !== null;

  use2048Keyboard(move, interactionsEnabled);

  const handleResume = () => {
    resumeGame();
    setShowResume(false);
  };

  const handleNewGame = () => {
    newGame();
    setShowResume(false);
  };

  if (isLoading || !isHydrated) {
    return <div className='w-full aspect-square eink-paper animate-pulse' aria-busy='true' />;
  }

  if (isLimitReached) {
    return <DailyLimitScreen usedTodayMs={usedTodayMs} dailyBudgetMs={dailyBudgetMs} />;
  }

  if (state === null) {
    return <div className='w-full aspect-square eink-paper animate-pulse' aria-busy='true' />;
  }

  return (
    <div className='flex flex-col'>
      <div className='relative'>
        <Board2048
          tiles={state.tiles}
          newTileIds={newTileIds}
          onSwipe={move}
          enabled={interactionsEnabled}
        />

        {showResume && (
          <ResumeDialog2048
            score={state.score}
            onResume={handleResume}
            onNewGame={handleNewGame}
          />
        )}

        {showModal && (
          <GameOverModal
            hasWon={state.hasWon}
            continueAfterWin={state.continueAfterWin}
            score={state.score}
            elapsedMs={state.elapsedMs}
            onContinue={continueAfterWin}
            onNewGame={handleNewGame}
          />
        )}
      </div>

      <Controls2048
        score={state.score}
        best={state.best}
        elapsedMs={state.elapsedMs}
        moveCount={state.moveCount}
        onNewGame={handleNewGame}
      />
    </div>
  );
}
