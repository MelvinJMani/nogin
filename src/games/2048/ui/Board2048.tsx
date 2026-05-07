import { useRef } from 'react';
import type React from 'react';
import type { Tile, Direction } from '../types';
import { Tile2048 } from './Tile2048';
import { useSwipe2048 } from '../hooks/useSwipe2048';

type Props = {
  tiles: ReadonlyArray<Tile>;
  newTileIds: ReadonlySet<number>;
  onSwipe: (direction: Direction) => void;
  enabled: boolean;
};

const CELL_COUNT = 16;

export function Board2048({ tiles, newTileIds, onSwipe, enabled }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);

  useSwipe2048(onSwipe, boardRef as React.RefObject<HTMLElement | null>, enabled);

  // Build position lookup: 'row-col' → tile
  const tileMap = new Map<string, Tile>();
  for (const tile of tiles) {
    tileMap.set(`${tile.row}-${tile.col}`, tile);
  }

  return (
    <div
      ref={boardRef}
      className='w-full aspect-square eink-paper border border-[rgb(var(--ink-border))] p-1.5'
      aria-label='2048 game board'
      role='grid'
    >
      <div className='grid grid-cols-4 grid-rows-4 gap-1.5 w-full h-full'>
        {Array.from({ length: CELL_COUNT }, (_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const tile = tileMap.get(`${row}-${col}`);
          return (
            <div
              key={i}
              className='relative'
              role='gridcell'
              aria-label={tile ? `${tile.value}` : 'empty'}
            >
              {/* Empty cell background */}
              <div className='absolute inset-0 bg-[rgb(var(--ink-fg))]/[0.04]' />
              {/* Tile */}
              {tile && (
                <div className='absolute inset-0'>
                  <Tile2048 tile={tile} isNew={newTileIds.has(tile.id)} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
