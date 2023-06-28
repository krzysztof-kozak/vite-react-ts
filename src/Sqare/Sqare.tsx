interface SquareProps {
    value: "X" | "O" | null;
    index: number;
    onSquareClick: (index: number) => void;
}

export function Square({ value, index, onSquareClick }: SquareProps) {
    return <button onClick={() => onSquareClick(index)}>{value}</button>;
}
