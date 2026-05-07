export const HAPTIC = {
  tap: 10,
  success: [30, 20, 30],
  error: 50,
  longPress: 20,
} as const;

export function vibrate(pattern: number | readonly number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      const p: VibratePattern = Array.isArray(pattern) ? (pattern as number[]).slice() : (pattern as number);
      navigator.vibrate(p);
    } catch {
      // Haptics are enhancement only — silent failure is correct
    }
  }
}
