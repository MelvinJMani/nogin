export type MergeResult = {
  readonly row: readonly number[];
  readonly scoreDelta: number;
};

// Slides a row left and merges equal adjacent tiles.
// Each tile can only participate in one merge per move.
export function mergeRow(input: readonly number[]): MergeResult {
  const nonZero = input.filter((v) => v !== 0);
  const merged: number[] = [];
  let scoreDelta = 0;
  let i = 0;
  while (i < nonZero.length) {
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
      const newValue = nonZero[i] * 2;
      merged.push(newValue);
      scoreDelta += newValue;
      i += 2;
    } else {
      merged.push(nonZero[i]);
      i++;
    }
  }
  while (merged.length < 4) merged.push(0);
  return { row: merged, scoreDelta };
}
