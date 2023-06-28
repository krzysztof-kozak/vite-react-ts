import styles from "./style.module.scss";

interface StatusProps {
    nextMove: "X" | "O";
    winner: "X" | "O" | null;
    onReset: () => void;
}

export function Status({ nextMove, winner, onReset }: StatusProps) {
    return (
        <div className={styles.status}>
            {!winner && (
                <p>
                    Next: <b>{nextMove}</b>
                </p>
            )}

            {winner && (
                <>
                    <p>
                        <b>{winner}</b> has won!
                    </p>
                    <button onClick={onReset}>reset</button>
                </>
            )}
        </div>
    );
}
