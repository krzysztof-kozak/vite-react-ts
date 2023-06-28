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
    const [history, setHistory] = useState<Square[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [winner, setWinner] = useState<Square>(null);

    const onSquareClick = (index: number) => {
        if (history[currentMove][index]) return;
        if (winner) return;

        const nextSquares = [...squares];
        nextSquares[index] = currentMove % 2 === 0 ? "O" : "X";
        setCurrentMove((move) => move + 1);

        setHistory([...history, nextSquares]);

        const winningSquare = checkForWinner(nextSquares);
        setWinner(winningSquare);
    };

    const onGameReset = () => {
        setHistory([Array(9).fill(null)]);
        setWinner(null);
        setCurrentMove(0);
    };

    const onTimeTravel = (moveIndex: number) => {
        const newHistory = history.slice(0, moveIndex);

        setHistory(newHistory);
        setCurrentMove(moveIndex - 1);

        if (winner) {
            setWinner(null);
        }
    };

    const squares = history[currentMove];

    return (
        <>
            <Status
                winner={winner}
                nextMove={currentMove % 2 === 0 ? "O" : "X"}
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
            <History
                history={history}
                onTimeTravel={onTimeTravel}
                currentMove={currentMove}
            />
        </>
    );
}

export default App;
