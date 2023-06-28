import { useState } from "react";
import { Board } from "./Board/Board";
import { Square } from "./Sqare/Sqare";
import { Status } from "./Status/Status";
import { History } from "./History/History";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
] as const;

function checkForWinner(squares: Square[]) {
    let winner: Square = null;

    for (const combination of winningCombinations) {
        const [indexA, indexB, indexC] = combination;

        const winnerFound =
            squares[indexA] !== null &&
            squares[indexA] === squares[indexB] &&
            squares[indexA] === squares[indexC];

        winner = winnerFound ? squares[indexA] : null;
        if (winner) break;
    }

    return winner;
}

export type Square = null | "X" | "O";

function App() {
    const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(false);
    const [winner, setWinner] = useState<Square>(null);
    const [history, setHistory] = useState<Square[][]>([Array(9).fill(null)]);

    const onSquareClick = (index: number) => {
        if (squares[index]) return;
        if (winner) return;

        const nextSquares = [...squares];
        nextSquares[index] = xIsNext ? "X" : "O";

        setSquares(nextSquares);
        setHistory([...history, nextSquares]);
        setXIsNext((v) => !v);

        const winningSquare = checkForWinner(nextSquares);
        setWinner(winningSquare);
    };

    const onGameReset = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(false);
        setWinner(null);
        setHistory([Array(9).fill(null)]);
    };

    return (
        <>
            <Status
                winner={winner}
                nextMove={xIsNext ? "X" : "O"}
                onReset={onGameReset}
            />
            <Board>
                {squares.map((value, index) => {
                    return (
                        <Square
                            key={index}
                            value={value}
                            index={index}
                            onSquareClick={onSquareClick}
                        />
                    );
                })}
            </Board>
            <History history={history} />
        </>
    );
}

export default App;
