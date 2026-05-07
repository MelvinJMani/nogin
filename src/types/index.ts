import type { ComponentType } from 'react';

export type Mode = 'pearl' | 'carta' | 'warm' | 'amber' | 'dark';

export type Game = { name: string; path: string; icon: string };

export type GameConfig = {
  title: string;
  Component: ComponentType;
};
