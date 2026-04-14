type Props = {
  value: number | null;
};

export function SudokuCell({ value }: Props) {
  return <div>{value ?? ''}</div>;
}
