import { useRef } from 'react';
import type React from 'react';

export type LongPressOptions = {
  onLongPress: () => void;
  delay?: number;
};

export type LongPressHandlers = {
  onPointerDown: React.PointerEventHandler;
  onPointerUp: React.PointerEventHandler;
  onPointerLeave: React.PointerEventHandler;
};

export function useLongPress({ onLongPress, delay = 350 }: LongPressOptions): LongPressHandlers {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start: React.PointerEventHandler = (e) => {
    e.preventDefault();
    timerRef.current = setTimeout(() => {
      onLongPress();
      timerRef.current = null;
    }, delay);
  };

  const cancel: React.PointerEventHandler = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return {
    onPointerDown: start,
    onPointerUp: cancel,
    onPointerLeave: cancel,
  };
}
