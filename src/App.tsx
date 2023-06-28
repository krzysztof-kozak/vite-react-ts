import { useState } from "react";
import { Board } from "./Board/Board";
import { Square } from "./Sqare/Sqare";
import { Status } from "./Status/Status";
import { History } from "./History/History";

function App() {
    const [squares, setSquares] = useState<(null | "X" | "O")[]>(
        Array(9).fill(null)
    );

    const [xIsNext, setXIsNext] = useState(false);

    const onSquareClick = (index: number) => {
        if (squares[index]) return;

        const nextSquares = [...squares];
        nextSquares[index] = xIsNext ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext((v) => !v);
    };

    return (
        <>
            <Status winner={null} nextMove={xIsNext ? "X" : "O"} />
            <Board>
                {squares.map((value, index) => {
                    return (
                        <Square
                            value={value}
                            index={index}
                            onSquareClick={onSquareClick}
                        />
                    );
                })}
            </Board>
            <History />
        </>
    );
}

export default App;
