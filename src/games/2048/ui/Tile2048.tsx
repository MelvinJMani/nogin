import type { Tile } from '../types';

type Props = {
  tile: Tile;
  isNew: boolean;
};

type TileStyle = { bgOpacity: number; invertText: boolean; fontSize: string };

function getTileStyle(value: number): TileStyle {
  let bgOpacity: number;
  if (value <= 2) bgOpacity = 0.07;
  else if (value <= 4) bgOpacity = 0.13;
  else if (value <= 8) bgOpacity = 0.21;
  else if (value <= 16) bgOpacity = 0.30;
  else if (value <= 32) bgOpacity = 0.40;
  else if (value <= 64) bgOpacity = 0.52;
  else if (value <= 128) bgOpacity = 0.63;
  else if (value <= 256) bgOpacity = 0.73;
  else if (value <= 512) bgOpacity = 0.81;
  else if (value <= 1024) bgOpacity = 0.87;
  else if (value <= 2048) bgOpacity = 0.93;
  else bgOpacity = 1.0;

  const invertText = value >= 64;

  const digits = value.toString().length;
  let fontSize: string;
  if (digits <= 2) fontSize = 'text-xl';
  else if (digits === 3) fontSize = 'text-lg';
  else if (digits === 4) fontSize = 'text-base';
  else fontSize = 'text-xs';

  return { bgOpacity, invertText, fontSize };
}

export function Tile2048({ tile, isNew }: Props) {
  const { bgOpacity, invertText, fontSize } = getTileStyle(tile.value);

  return (
    <div
      className={`
        w-full h-full flex items-center justify-center
        font-mono font-semibold select-none
        transition-opacity duration-100
        ${isNew ? 'tile-2048-new' : ''}
        ${invertText ? 'text-[rgb(var(--ink-bg))]' : 'text-[rgb(var(--ink-fg))]'}
        ${fontSize}
      `}
      style={{ background: `rgb(var(--ink-fg) / ${bgOpacity})` }}
      aria-label={String(tile.value)}
    >
      {tile.value}
    </div>
  );
}
