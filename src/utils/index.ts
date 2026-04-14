export function isSameBox(r1: number, c1: number, r2: number, c2: number) {
  return (
    Math.floor(r1 / 3) === Math.floor(r2 / 3) &&
    Math.floor(c1 / 3) === Math.floor(c2 / 3)
  );
}
